const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Helper: Generate a signed JWT for a given user ID
 * @param {string} id - MongoDB user _id
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

/**
 * Helper: Cookie options for httpOnly JWT cookie
 * - httpOnly: JS cannot access it (XSS protection)
 * - secure: only sent over HTTPS in production
 * - sameSite: CSRF protection (strict in prod, lax in dev for proxy)
 * - maxAge: matches JWT_EXPIRE (default 7 days in ms)
 */
const getCookieOptions = () => ({
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days
    path:     '/',
});


/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
    // 1. Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg // Returning the first validation error message
        });
    }

    const { name, email, password } = req.body;

    // 2. Check if user already exists (extra safety check before Mongoose unique constraint)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    // 3. Create user
    const user = await User.create({
        name,
        email,
        password
    });

    // 4. Send success response
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
});

/**
 * @desc    Login user & set JWT in httpOnly cookie
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
    // 1. Check for validation errors (email format, required fields)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    const { email, password } = req.body;

    // 2. Find user — use .select('+password') if password field is hidden by default
    const user = await User.findOne({ email });

    // 3. Generic error message — never reveal whether email or password is wrong
    //    (prevents user enumeration attacks)
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    // 4. Compare entered password with hashed password via model instance method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    // 5. Generate JWT token and set it as an httpOnly cookie
    const token = generateToken(user._id);
    res.cookie('token', token, getCookieOptions());

    // 6. Return success with safe user data (token is in the cookie, NOT in body)
    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            id:    user._id,
            name:  user.name,
            email: user.email,
        }
    });
});

/**
 * @desc    Logout user — clear the httpOnly cookie
 * @route   POST /api/auth/logout
 * @access  Public (cookie is cleared regardless)
 */
exports.logout = asyncHandler(async (req, res, next) => {
    // Clear the token cookie by setting maxAge to 0
    res.cookie('token', '', {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge:   0,
        path:     '/',
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});

/**
 * @desc    Get current logged-in user (validate session)
 * @route   GET /api/auth/me
 * @access  Private (requires valid httpOnly cookie)
 */
exports.getMe = asyncHandler(async (req, res, next) => {
    // req.user is set by the protect middleware (authMiddleware.js)
    res.status(200).json({
        success: true,
        data: {
            id:    req.user._id,
            name:  req.user.name,
            email: req.user.email,
        }
    });
});
