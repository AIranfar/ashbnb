const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];


router.get('./current', requireAuth, async(req, res, next) => {
  const currentUser = await User.findByPk(req.user.id)

  return res.json(currentUser)
})

router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName } = req.body;
        const isEmail = await User.findOne({
          where: {
            email
          }
        })
        const isUser = await User.findOne({
          where: {
            username
          }
        })

        if (isEmail) {
          return res.status(403).json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
              "email": "User with that email already exists"
            }
          })
        }

        if (isUser) {
          return res.status(403).json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": {
              "username": "User with that username already exists"
            }
          })
        }

        const user = await User.signup({ email, username, password, firstName, lastName });

      const token = await setTokenCookie(res, user);
      const userRes = user.toJSON()
      userRes.token = token
      return res.json(userRes)
    }
);

module.exports = router;
