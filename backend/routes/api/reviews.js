const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Add a Image to a Review based on Review Id

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body
    const newImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })
    const reviews = await Review.findByPk(req.params.reviewId);
    const images = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })

    if (!reviews) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }
    if (images.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": "403"
        })
    }
    if (req.user.id !== reviews.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }
    res.json({ id: newImage.id, url: newImage.url })
})

// Get all reviews of Current User

router.get('/current', requireAuth, async (req, res) => {
    const allReviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    const allSpots = await Spot.findAll({
        include: [
            SpotImage
        ]
    });
    let spots = [];
    for (let spot of allSpots) {
        spots.push(spot.toJSON())
    }
    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]
        spot.SpotImages.forEach(image => {
            if(image.preview) {
                allReviews.forEach(review => {
                    review.Spot.dataValues.previewImage = image.url
                })
            }
        })
    }
    res.json({ Reviews: allReviews })
})

// Delete Reviews

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const id = req.params.reviewId
    const deletedReview = await Review.findByPk(id);
    console.log(deletedReview)
    if (!deletedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (req.user.id !== deletedReview.userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    await deletedReview.destroy();
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
