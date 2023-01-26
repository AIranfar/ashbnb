const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { SpotImage } = require('../../db/models')

// Delete spot image

router.delete('/:imageId', requireAuth, async(req, res) => {
    const deletedImage = await SpotImage.findByPk(req.params.imageId);

    if (deletedImage) {
        await deletedImage.destroy();
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": res.statusCode
        })
    } else if (!deletedImage) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": res.statusCode
        })
    }
})


module.exports = router;
