const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete a Booking

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
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})

module.exports = router;
