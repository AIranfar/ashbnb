const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete Review Image

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const deletedImage = await ReviewImage.findByPk(req.params.imageId);

    if (req.user.id !== deletedImage.ownerId){
        return res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }
    if (!deletedImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": res.statusCode
        })
    }
    await deletedImage.destroy();
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
