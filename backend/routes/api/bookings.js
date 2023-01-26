const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js')
const { Booking, Review, ReviewImage, Spot, SpotImage, User } = require('../../db/models');


module.exports = router;
