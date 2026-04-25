const env = require("../config/env");

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const details =
    err.errors || (env.nodeEnv === "production" ? null : { stack: err.stack });

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errors: details,
  });
};

module.exports = errorHandler;
