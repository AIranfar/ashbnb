const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Get all Current User's Bookings --DONE

router.get('/current', requireAuth, async (req, res) => {
    const allBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
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
                allBookings.forEach(review => {
                    review.Spot.dataValues.previewImage = image.url
                })
            }
        })
    }
    res.json({ Bookings: allBookings })
})

// Edit a Booking

// Delete a Booking --DONE

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const deletedBooking = await Booking.findByPk(req.params.bookingId);

    if (!deletedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (req.user.id !== deletedBooking.userId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    await deletedBooking.destroy();
    return res.json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;
