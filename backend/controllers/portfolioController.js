const Portfolio = require('../models/Portfolio');
const asyncHandler = require('../utils/asyncHandler');

const toSlug = (value = '') => {
    const normalized = String(value)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalized || 'portfolio';
};

const generateUniquePublicSlug = async (seedValue) => {
    const base = toSlug(seedValue);
    let slug = base;
    let suffix = 1;

    while (await Portfolio.exists({ publicSlug: slug })) {
        suffix += 1;
        slug = `${base}-${suffix}`;
    }

    return slug;
};

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
    // Add user from auth middleware and preserve a stable public slug.
    const existingPortfolio = await Portfolio.findOne({ user: req.user._id }).select('publicSlug');
    const publicSlug = existingPortfolio?.publicSlug
        || await generateUniquePublicSlug(req.body.fullName || req.user.name || req.user.email);

    req.body.user = req.user._id;
    req.body.publicSlug = publicSlug;

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

// @desc    Get portfolio by public slug (Public)
// @route   GET /api/portfolio/public/:slug
// @access  Public
exports.getPortfolioBySlug = asyncHandler(async (req, res, next) => {
    const portfolio = await Portfolio.findOne({ publicSlug: req.params.slug })
        .select('-user -__v -_id');

    if (!portfolio) {
        return res.status(404).json({
            success: false,
            message: 'Portfolio not found'
        });
    }

    res.status(200).json({
        success: true,
        data: portfolio
    });
});
