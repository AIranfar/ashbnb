const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Spot, SpotImage, Review } = require('../../db/models');

// find all spots
router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
            model: Review
        },
        {
            model: SpotImage
        }
    ]
    })

    // const review = await Review.findAll({
    //     where: {
    //         spotId: spots.id,
    //         attributes: ['stars']
    //     }
    // })

    return res.json({spots})
})

// Create a spot
router.post('/', requireAuth, async(req, res, next) => {
    const newSpot = req.user.id

    const { address, city, state, country, lat, lng, name, description, price} = req.body

    const spots = await Spot.create({
        ownerId: newSpot,
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

    if (spots){
        res.status(201)
        res.json(spots)
    }

    if (!spots) {
        const errors = {}
        errors.address = 'Street address is required'
        errors.status(400)
        next(errors)
    }
})



module.exports = router;
