const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const categoryRoutes = require("./modules/categories/category.routes");
const productRoutes = require("./modules/products/product.routes");
const previewRoutes = require("./modules/preview/preview.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const corsOptions =
  env.nodeEnv === "development"
    ? {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: "*",
      }
    : {
        origin: env.clientUrl || false,
      };

app.use(cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.set("json spaces", 2);

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Student CRUD API</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f7f8fa; color: #1f2937; margin: 0; }
      .container { max-width: 960px; margin: 40px auto; background: #fff; padding: 28px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
      h1 { margin-top: 0; }
      p { line-height: 1.6; }
      .links { display: grid; gap: 10px; margin: 20px 0; }
      .links a { text-decoration: none; background: #2563eb; color: #fff; padding: 10px 14px; border-radius: 8px; display: inline-block; width: fit-content; }
      .links a:hover { background: #1d4ed8; }
      pre { background: #0f172a; color: #e2e8f0; padding: 14px; border-radius: 8px; overflow-x: auto; }
      code { font-family: Consolas, monospace; }
      .queries code { display: block; margin: 6px 0; }
    </style>
  </head>
  <body>
    <main class="container">
      <h1>Student CRUD API</h1>
      <p>This backend is built for students to practice CRUD with Categories and Products </p>
      <div class="links">
        <a href="/api/categories">View Categories</a>
        <a href="/api/products">View Products</a>
      </div>

      <h2>Example Body: POST /api/categories</h2>
      <pre><code>{
  "name": "Accessories",
  "description": "Useful accessories"
}</code></pre>

      <h2>Example Body: POST /api/products</h2>
      <pre><code>{
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 60,
  "quantity": 12,
  "categoryId": "CATEGORY_ID_HERE"
}</code></pre>

    </main>
  </body>
</html>`);
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    data: null,
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/preview", previewRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
