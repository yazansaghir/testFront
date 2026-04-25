const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL,
  clientUrl: process.env.CLIENT_URL || "",
};

if (!env.databaseUrl) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}

module.exports = env;
