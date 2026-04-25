# Student CRUD API

Professional and beginner-friendly backend for practicing CRUD operations with Categories and Products.

## Project Overview

This project uses Node.js, Express, Prisma, and Neon PostgreSQL. It includes:

- Layered architecture (`routes -> controller -> service`)
- Validation with Zod
- Centralized error handling
- Preview endpoints for student exploration
- Vercel-ready deployment setup
- Root HTML landing page with quick API links

## Folder Structure

```text
api/
  index.js
prisma/
  schema.prisma
  seed.js
src/
  app.js
  server.js
  config/
    env.js
    prisma.js
  middlewares/
    errorHandler.js
    notFound.js
    validate.js
  modules/
    categories/
    products/
    preview/
  utils/
    ApiError.js
    asyncHandler.js
vercel.json
```

## Environment Variables

Copy `.env.example` to `.env`:

```env
DATABASE_URL=""
NODE_ENV="development"
PORT=5000
CLIENT_URL=""
```

- `DATABASE_URL`: Neon PostgreSQL connection string
- `NODE_ENV`: `development` or `production`
- `PORT`: local server port
- `CLIENT_URL`: frontend URL for deployed app (optional)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations (local/dev database):

```bash
npm run prisma:migrate -- --name init
```

4. Seed sample data:

```bash
npm run prisma:seed
```

5. Start local server:

```bash
npm run dev
```

Base URL: `http://localhost:5000`

## Neon Setup

1. Create a Neon project at [Neon](https://neon.tech/)
2. Copy your PostgreSQL connection string
3. Put it in `DATABASE_URL` in `.env`
4. Keep `sslmode=require` in the connection string

## Prisma Commands

- `npm run prisma:generate`
- `npm run prisma:migrate -- --name init`
- `npm run prisma:seed`

## Seeded Data

Categories:

- Electronics
- Books
- Clothing

Products:

- Laptop (Electronics)
- Phone (Electronics)
- Novel Book (Books)
- T-shirt (Clothing)

Seed script is idempotent: running multiple times updates or reuses records without creating duplicates for the same product/category pair.

## Explore the API

Visit `/` to open the public preview HTML page with quick links and sample request bodies.

Core endpoints:

- `GET /api/categories`
- `GET /api/products`
- `GET /api/preview/categories-with-products`
- `GET /api/preview/stats`

Product filters:

- `/api/products?categoryId=`
- `/api/products?search=`
- `/api/products?minPrice=&maxPrice=`
- `/api/products?page=1&limit=10`

Example bodies:

`POST /api/categories`

```json
{
  "name": "Accessories",
  "description": "Useful accessories"
}
```

`POST /api/products`

```json
{
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "price": 60,
  "quantity": 12,
  "categoryId": "CATEGORY_ID_HERE"
}
```

## Scripts

- `npm run dev`
- `npm start`
- `npm run build`
- `npm run postinstall`
- `npm run prisma:migrate`
- `npm run prisma:generate`
- `npm run prisma:seed`

## Deploy on Vercel

1. Push this project to GitHub
2. Import repository into Vercel
3. Add environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `CLIENT_URL` (optional, if frontend is deployed)
   - `NODE_ENV=production`
4. Deploy

Important notes:

- Vercel does not automatically run `prisma migrate dev` in production.
- Run production-safe migrations separately (for example via CI/CD or `prisma migrate deploy` workflow).
- Prisma Client generation is handled by `build`/`postinstall` scripts.
