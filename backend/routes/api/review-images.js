const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete Review Image --DONE

router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)
    const reviews = await Review.findAll()
    if(!reviewImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": res.statusCode
        })
    }
    let userId;
    reviews.forEach(review => {
        userId = review.userId
    });

    if (req.user.id !== userId) {
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

   await reviewImage.destroy()
   res.json(({
        message: "Successfully deleted",
        statusCode: 200
   }))
})


module.exports = router;
