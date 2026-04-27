const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

// Sanity check for environment variables in production (Vercel)
if (process.env.NODE_ENV === 'production') {
    if (!process.env.MONGO_URI) console.error('CRITICAL: MONGO_URI is not defined!');
    if (!process.env.JWT_SECRET) console.error('CRITICAL: JWT_SECRET is not defined!');
}

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent/received cross-origin
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.send('Portfolio Generator API is running...');
});

// Error Handling Middleware (Must be after routes)
app.use(errorHandler);

// Export the app for Vercel
module.exports = app;

// Only start the server if we're not running as a Vercel function
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}
