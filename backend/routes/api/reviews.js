const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');

// Delete Reviews



module.exports = router;
