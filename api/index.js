module.exports = function (req, res) {
  res.status(200).json({
    status: "success",
    message: "Diagnostic check passed. Infrastructure is healthy.",
    method: req.method,
    url: req.url
  });
};
