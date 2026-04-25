# Student CRUD Practice API (Node.js + Express + Prisma + Neon)

Professional, beginner-friendly backend API for practicing CRUD operations from any frontend.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- Prisma ORM
- dotenv
- cors
- helmet
- morgan
- zod (request validation)

## Project Structure

```text
src/
  app.js
  server.js
  config/
    env.js
    prisma.js
  modules/
    categories/
      category.routes.js
      category.controller.js
      category.service.js
      category.validation.js
    products/
      product.routes.js
      product.controller.js
      product.service.js
      product.validation.js
  middlewares/
    errorHandler.js
    notFound.js
    validate.js
  utils/
    ApiError.js
    asyncHandler.js
prisma/
  schema.prisma
  seed.js
```

## Features

- Clean layered architecture (routes -> controller -> service)
- Centralized error handling
- Async wrapper (`asyncHandler`) to avoid repeated try/catch
- Consistent response format for success and errors
- Full CRUD for categories and products
- Product filtering:
  - by category (`categoryId`)
  - by search (`search` in name/description)
  - by price range (`minPrice`, `maxPrice`)
  - pagination (`page`, `limit`)
- Product responses include related category
- Category delete protection when products exist
- Security headers with Helmet, CORS support, and HTTP request logging with Morgan

## Database Models

### Category
- `id` UUID primary key
- `name` string, unique, required
- `description` string, optional
- `createdAt`
- `updatedAt`

### Product
- `id` UUID primary key
- `name` string, required
- `description` string, optional
- `price` decimal, required, >= 0
- `quantity` integer, default 0, >= 0
- `categoryId` UUID, required
- `createdAt`
- `updatedAt`

### Relationship
- One Category has many Products
- One Product belongs to one Category
- Category deletion is blocked if related products exist

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env` and update values:

```env
NODE_ENV=development
PORT=5000
CORS_ORIGIN=*
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DB_NAME?sslmode=require"
```

### 3) Neon PostgreSQL setup

1. Create a project in [Neon](https://neon.tech/).
2. Create a database (or use default database).
3. Copy the connection string.
4. Paste it into `DATABASE_URL` in `.env`.
5. Ensure the URL includes `sslmode=require`.

### 4) Prisma commands

Generate Prisma client:

```bash
npm run prisma:generate
```

Create and apply migrations:

```bash
npm run prisma:migrate -- --name init
```

Seed sample data:

```bash
npm run prisma:seed
```

### 5) Run development server

```bash
npm run dev
```

Server URL: `http://localhost:5000`

Health check: `GET /health`

## Available Scripts

- `npm run dev` -> Run with nodemon
- `npm start` -> Run production server
- `npm run prisma:migrate` -> Run Prisma migrations
- `npm run prisma:generate` -> Generate Prisma client
- `npm run prisma:seed` -> Seed sample data

## API Endpoints

Base URL: `http://localhost:5000`

### Categories

- `GET /api/categories`
- `GET /api/categories/:id`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`

#### Example category request body

```json
{
  "name": "Electronics",
  "description": "Phones, laptops, and accessories"
}
```

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

#### Product query parameters

- `categoryId` -> filter by category UUID
- `search` -> search by product name/description
- `minPrice` and `maxPrice` -> filter by price range
- `page` and `limit` -> pagination

Example:

`GET /api/products?categoryId=...&search=mouse&minPrice=10&maxPrice=100&page=1&limit=10`

#### Example product request body

```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic and rechargeable",
  "price": 24.99,
  "quantity": 20,
  "categoryId": "YOUR_CATEGORY_UUID"
}
```

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

In development, error stack traces are included to help debugging.
In production, stack traces are hidden.
