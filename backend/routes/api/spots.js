const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Spot, SpotImage, Review } = require('../../db/models');

// get all spots
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
    const userId = req.user.id

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

    if (spots){
        res.status(201)
        res.json(spots)
    }
})

// Delete a Spot

router.delete('/:spotId', requireAuth, async (req, res) => {
    const deletedSpot = await Spot.findByPk(req.params.spotId);

    if (deletedSpot) {
        await deletedSpot.destroy();
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": res.statusCode
        })
    } else if (!deletedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": res.statusCode
        })
    }
})



module.exports = router;
