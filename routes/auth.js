const { Router } = require('express');
const router = Router();

const { registerValidators } = require('../utils/validators');

const {
  getAuthLoginController,
  getAuthLogOutController,
  postAuthLoginController,
  postAuthRegisterController,
  getAuthResetPasswordController,
  getAuthResetPasswordWithTokenController,
  postAuthChangePasswordController,
  postResetPasswordController,
} = require('../controllers/authController');

router.get('/login', getAuthLoginController);
router.post('/login', postAuthLoginController);
router.get('/logout', getAuthLogOutController);
router.get('/reset', getAuthResetPasswordController);
router.post('/register', registerValidators, postAuthRegisterController);
router.get('/password/:token', getAuthResetPasswordWithTokenController);
router.post('/password', postAuthChangePasswordController);
router.post('/reset', postResetPasswordController);

module.exports = router;
