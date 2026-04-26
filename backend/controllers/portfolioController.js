const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get user portfolio
// @route   GET /api/portfolio
// @access  Private
exports.getPortfolio = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
        return res.status(200).json({
            success: true,
            data: null, // Return null instead of 404 to indicate no portfolio exists yet
            message: 'No portfolio found for this user'
        });
    }

    res.status(200).json({
        success: true,
        data: portfolio
    });
});

// @desc    Create or Update user portfolio
// @route   POST /api/portfolio
// @access  Private
exports.savePortfolio = asyncHandler(async (req, res, next) => {
    // Add user to req.body from the authMiddleware
    req.body.user = req.user._id;

    const portfolio = await Portfolio.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        {
            new: true,
            runValidators: true,
            upsert: true // Create if it doesn't exist
        }
    );

    res.status(200).json({
        success: true,
        data: portfolio,
        message: 'Portfolio saved successfully'
    });
});
// @desc    Get portfolio by user ID (Public)
// @route   GET /api/portfolio/u/:id
// @access  Public
exports.getPortfolioById = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findOne({ user: req.params.id });

    if (!portfolio) {
        return res.status(404).json({
            success: false,
            message: 'No portfolio found for this user'
        });
    }

    res.status(200).json({
        success: true,
        data: portfolio
    });
});
