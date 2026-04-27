const app = require('../backend/server.js');

module.exports = (req, res) => {
    // Basic logging for Vercel diagnostic purposes
    console.log(`[API Request]: ${req.method} ${req.url}`);
    return app(req, res);
};
