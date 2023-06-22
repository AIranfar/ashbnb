const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');
const { check } = require('express-validator')

const validateSpotError = [
    check('address')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        // .exists({ checkFalsy: true })
        // .notEmpty()
        .optional(),
        // .withMessage('Latitude is not valid'),
    check('lng')
        // .exists({ checkFalsy: true })
        // .notEmpty()
        .optional(),
        // .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
];

// get all spots --DONE

router.get('/', async (req, res) => {
    let { page, size , minLat, minLng, maxLat, maxLng, minPrice, maxPrice } = req.query

    page = parseInt(page);
    size = parseInt(size);

    if (!page) {
        page = 1
    }
    if (!size || size > 20) {
        size = 20
    }

    if (page <= 0 || size <= 0 || minPrice <= 0 || maxPrice <= 0) {
        return res.status(400).json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 1",
                "size": "Size must be greater than or equal to 1",
                "maxLat": "Maximum latitude is invalid",
                "minLat": "Minimum latitude is invalid",
                "minLng": "Maximum longitude is invalid",
                "maxLng": "Minimum longitude is invalid",
                "minPrice": "Maximum price must be greater than or equal to 0",
                "maxPrice": "Minimum price must be greater than or equal to 0"
            }
        })
    };

    let pagination = {};

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const allSpots = await Spot.findAll({
        ...pagination,
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
        } else {
            spot.avgRating = 'No ratings yet'
        }
        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        if (!image){
            spot.previewImage = 'Null'
        } else {
            spot.previewImage = image.url
        }
        delete spot.SpotImages
    }

    return res.json({ Spots: spots, page, size })
})

// Get all spots owned by the Current User --DONE

router.get('/current', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
        // include: [
        //     SpotImage
        // ]
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
        } else {
            spot.avgRating = 'No reviews yet'
        }
        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        if (!image){
            spot.previewImage = 'Null'
        } else {
            spot.previewImage = image.url
        }
    }


    // for (let spot of spots) {
    //     spot.SpotImages.forEach(img => {
    //         if (img.preview === true) {
    //             spot.previewImage = img.url
    //         }
    //     })
    // }

    return res.json({ Spots: spots })
})

// Get details of a Spot from ID --DONE

router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
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
    });

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const reviews = await Review.findAll({
        where:
        {
            spotId: spot.id
        }
    });

    const spotJSON = spot.toJSON()

    if (reviews.length) {
        let sum = 0
        for (let review of reviews) {
            sum += review.stars;
        }
        let average = sum / reviews.length;
        spotJSON.avgRating = average;
        spotJSON.numReviews = reviews.length;
    }

    return res.json(spotJSON)
})

// Create a spot --DONE

router.post('/', validateSpotError, requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    console.log('This sucks')
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

    if (req.user.id !== spots.ownerId) {
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

    res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
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
    if (req.user.id !== spot.ownerId) {
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

// Create a review for a Spot based on spotId --DONE

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(req.params.spotId)

    const checkReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    })

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (checkReview) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": res.statusCode
        })
    }

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

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review,
        stars
    })
    res.json(newReview)
})

// Get all Bookings for Spot based on Spot's Id --DONE

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statuscode": res.statusCode
        })
    }

    if (req.user.id === spot.ownerId) {
        const ownerBookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        return res.json({ Bookings: ownerBookings })
    }

    if (req.user.id !== spot.ownerId) {
        const visitorBookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        res.json({ Bookings: visitorBookings })
    }
})

// Create a Booking based on spotId --DONE

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const { startDate, endDate } = req.body;

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statuscode": res.statusCode
        })
    }

    if (spot.ownerId === req.user.id) {
        return res.status(403).json({
            "message": "Forbidden: Booked spot must not belong to current user",
            "statusCode": res.statusCode
        })
    }

    const requestedStart = new Date(startDate).getTime()
    const requestedEnd = new Date(endDate).getTime()

    if (requestedEnd <= requestedStart){
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": res.statusCode,
            "errors": {
                "endDate": "End Date cannot be on or before Start Date"
            }
        })
    }

    const allBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    })

    for (let booking of allBookings) {
        let oldStart = new Date(booking.startDate).getTime();
        let oldEnd = new Date(booking.endDate).getTime();

        if (oldStart >= requestedStart && oldEnd <= requestedEnd ||
            oldStart <= requestedStart && oldEnd >= requestedEnd) {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": res.statusCode,
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    }

    const newBooking = await Booking.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        startDate,
        endDate
    })

    return res.json(newBooking)
})

// Delete a Spot --DONE

router.delete('/:spotId', requireAuth, async (req, res) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);

    if (!deletedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (req.user.id !== deletedSpot.ownerId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    await deletedSpot.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;
