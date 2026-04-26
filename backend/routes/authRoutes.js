const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const { protect } = require('../middlewares/authMiddleware');

/**
 * @route   POST /api/auth/register
 */
router.post('/register', registerValidation, register);

/**
 * @route   POST /api/auth/login
 */
router.post('/login', loginValidation, login);

/**
 * @route   POST /api/auth/logout
 */
router.post('/logout', logout);

/**
 * @route   GET /api/auth/me
 * @access  Private — requires valid httpOnly cookie
 */
router.get('/me', protect, getMe);

module.exports = router;
