const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Get all reviews of Current User --DONE

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

// Add a Image to a Review based on Review Id --DONE

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

// Edit a Review --DONE

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body

    const changedReview = await Review.findByPk(req.params.reviewId);

    if (!changedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }
    // if (!review) {
    //     return res.status(400).json({
    //         "message": "Validation Error: Review text is required",
    //         "statusCode": res.statusCode
    //     })
    // }

    if (stars < 1 || stars > 5 || !review) {
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": res.statusCode,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    }

    if (req.user.id !== changedReview.userId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    changedReview.review = review
    changedReview.stars = stars
    await changedReview.save();

    return res.json(changedReview)
})

// Delete Reviews --DONE

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const id = req.params.reviewId
    const deletedReview = await Review.findByPk(id);

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
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
