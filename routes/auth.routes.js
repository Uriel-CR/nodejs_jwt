const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifySignup = require('../middlewares/verifySignup');

router.post(
  '/signup',
  [
    verifySignup.checkDuplicateUsernameOrEmail,
    verifySignup.checkRolesExisted
  ],
  authController.signup
);

router.post('/signin', authController.signin);

module.exports = router;
