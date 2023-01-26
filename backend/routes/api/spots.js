const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            SpotImage
        ]
    });

    let spots = [];
    for (let spot of allSpots) {
        spots.push(spot.toJSON())
    }

    for (let spot of spots) {
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })
        if (reviews.length) {
            let sum = 0
            for (let review of reviews) {
                sum += review.stars;
            }
            let average = sum / reviews.length;
            spot.avgRating = average;

        }
    }

    for (let spot of spots) {
        spot.previewImage = spot.SpotImages[0].url
        delete spot.SpotImages
    }

    return res.json({ Spots: spots })
})

// Get all spots owned by the Current User

router.get('/current', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            SpotImage
        ]
    })

    let spots = [];
    for (let spot of allSpots) {
        spots.push(spot.toJSON())
    }

    for (let spot of spots) {
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })
        if (reviews.length) {
            let sum = 0
            for (let review of reviews) {
                sum += review.stars;
            }
            let average = sum / reviews.length;
            spot.avgRating = average;
        }
    }

    for (let spot of spots) {
        spot.previewImage = spot.SpotImages[0].url
        delete spot.SpotImages
    }

    return res.json({ Spots: spots })
})

// Get details of a Spot from ID

router.get('/:spotId', requireAuth, async (req, res) => {
    const allSpots = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: User, as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            }
        ]
    })

    if (req.user.id !== spots.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: allSpots.id
        }
    })
    const numReviews = reviews.length

    for (let spot of allSpots) {
        spot.numReviews = numReviews
    }
    if (!allSpots) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }
    return res.json(allSpots)
})



// Create a spot
router.post('/', requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price} = req.body

    const newSpot = await Spot.create({
        ownerId: userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    if (newSpot){
        return res.status(201).json(newSpot)
    }

    if (!newSpot) {
        res.status(400).json({
            "message": "Validation Error",
            "statusCode": res.statusCode,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
        })
    }
})

// Add an Image to a Spot based on the Spot's id

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body

    if (req.user.id !== spots.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    if (!spots) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    let newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview  })
})

// Edit a Spot


// Delete a Spot

router.delete('/:spotId', requireAuth, async (req, res) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);

    if (!deletedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }
    await deletedSpot.destroy();
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})



module.exports = router;
