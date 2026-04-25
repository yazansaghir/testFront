const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

if (!env.databaseUrl) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}

module.exports = env;
