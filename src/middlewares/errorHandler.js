const env = require("../config/env");

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const details =
    err.errors || (env.nodeEnv === "production" ? null : { stack: err.stack });
  const message =
    env.nodeEnv === "production" && statusCode >= 500
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: details,
  });
};

module.exports = errorHandler;
