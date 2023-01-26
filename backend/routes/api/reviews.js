const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete Reviews

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const deletedReview = await Review.findByPk(req.params.reviewId);

    if (!deletedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": res.statusCode
        })
    }

    await deletedReview.destroy();
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
