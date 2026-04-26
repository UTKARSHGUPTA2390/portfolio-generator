const express = require('express');
const router = express.Router();
const { getPortfolio, savePortfolio, getPortfolioById } = require('../controllers/portfolioController');
const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/u/:id', getPortfolioById);

// Protected routes
router.use(protect);

router.route('/')
    .get(getPortfolio)
    .post(savePortfolio);

module.exports = router;
