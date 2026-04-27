const app = require("../backend/server.js");

module.exports = (req, res) => {
  // Debug log to help identify routing issues in Vercel
  console.log(`[API Request]: ${req.method} ${req.url}`);
  return app(req, res);
};
