const app = require("../backend/server.js");
const connectDB = require("../backend/config/db.js");

module.exports = async (req, res) => {
  // Ensure DB is connected for this request
  // Mongoose reuses the existing connection if already established
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection failed during request:", err);
  }
  
  return app(req, res);
};
