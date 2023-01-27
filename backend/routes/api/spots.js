const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { check } = require('express-validator')

const validateSpotError = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

// get all spots --DONE
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            {
                model: SpotImage
            }
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
        spot.SpotImages.forEach(img => {
            if (img.preview === true){
                spot.previewImage = img.url
                // console.log(spot.previewImage)
            }
        })
        // console.log(spot)
        delete spot.SpotImages
    }


    return res.json({ Spots: spots })
})

// Get all spots owned by the Current User --DONE

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



// Create a spot --DONE
router.post('/', validateSpotError,requireAuth, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price} = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
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

    return res.json(newSpot)
})

// Add an Image to a Spot based on the Spot's id --DONE

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spots = await Spot.findByPk(req.params.spotId);
    const { url, preview } = req.body

    if (!spots) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (req.user.id !== spots.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview  })
})

// Edit a Spot --DONE

router.put('/:spotId', validateSpotError, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            "message": "Spot could not be found",
            "statusCode": res.statusCode
        })
    }
    if (req.user.id !== spot.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price
    await spot.save();

    return res.json(spot)

})

// Get Reviews by spotId --DONE

router.get('/:spotId/reviews', async (req, res) => {
    const allReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'], as: 'User'
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    return res.json({ Review: allReviews })
})

// Create a review for a Spot based on spotId

// Delete a Spot --DONE

router.delete('/:spotId', requireAuth, async (req, res) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);

    if (req.user.id !== deletedSpot.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

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
