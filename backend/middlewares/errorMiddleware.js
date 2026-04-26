/**
 * Centralized error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // Mongoose duplicate key (Email already exists)
    if (err.code === 11000) {
        const message = 'User with this email already exists';
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({
            success: false,
            message
        });
    }

    // Default server error
    res.status(err.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
};

module.exports = errorHandler;
