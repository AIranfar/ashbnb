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

// Edit a Booking --DONE

router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const { startDate, endDate } = req.body;

    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
        })
    }

    if (booking.userId !== req.user.id){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    const requestedStart = new Date(startDate).getTime();
    const requestedEnd = new Date(endDate).getTime();
    const oldStart = new Date(booking.startDate).getTime();
    const oldEnd = new Date(booking.endDate).getTime();
    const currentDate = new Date().getTime();


    if (requestedEnd <= requestedStart) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": res.statusCode,
            "errors": {
              "endDate": "endDate cannot come before startDate"
            }
        })
    }

    if (requestedEnd < currentDate) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": res.statusCode
        })
    }

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

    booking.startDate = startDate;
    booking.endDate = endDate;
    booking.save();

    return res.json(booking)
})

// Delete a Booking --DONE

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const deletedBooking = await Booking.findByPk(req.params.bookingId);

    if (!deletedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const start_Date = new Date(deletedBooking.startDate).getTime();
    const currentDate = new Date().getTime();

    if (start_Date <= currentDate) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
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
