// middlewares/authMiddleware.js
// Protects routes by verifying the JWT from the httpOnly cookie
// Interview concepts: middleware pattern, token verification, cookie-based auth

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Protect middleware — verifies JWT from httpOnly cookie
 * Attaches the user document to req.user for downstream handlers
 */
const protect = asyncHandler(async (req, res, next) => {
    // 1. Read token from httpOnly cookie (not from Authorization header)
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized — no token',
        });
    }

    try {
        // 2. Verify token signature + expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach full user document (minus password) to the request
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized — user not found',
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized — token invalid or expired',
        });
    }
});

module.exports = { protect };
