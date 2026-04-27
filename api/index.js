// const app = require('../backend/server.js');

module.exports = (req, res) => {
    console.log(`[Diagnostic Request]: ${req.method} ${req.url}`);
    res.status(200).json({
        status: 'ok',
        message: 'API route is reachable',
        url: req.url,
        method: req.method
    });
};
