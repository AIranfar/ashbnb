const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete spot image

router.delete('/:imageId', requireAuth, async (req, res) => {
    const deletedImage = await SpotImage.findByPk(req.params.imageId);

    if (!deletedImage) {
        res.status(404)
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": res.statusCode
        })
    }

    const spot = await Spot.findByPk(deletedImage.spotId)

    if (req.user.id !== spot.ownerId){
        res.status(403).json({
            "message": "Forbidden",
            "statusCode": res.statusCode
        })
    }

    await deletedImage.destroy();
    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": res.statusCode
    })
})


module.exports = router;
