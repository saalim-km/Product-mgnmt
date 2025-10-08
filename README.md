# NestJS + PostgreSQL Backend — Products, Orders, and Top Products Report

A small NestJS service backed by PostgreSQL to manage Products and Orders and provide a “top products” report.

- Tech: NestJS, TypeScript, PostgreSQL
- Endpoints:
  - Products: create, list
  - Orders: create, list
  - Reports: top products by total quantity sold (with optional limit)

## Table of Contents
- Overview
- Requirements
- Environment Variables
- Quick Start
- Running with Docker (optional)
- API Reference
  - Products
  - Orders
  - Reports
- Sample Workflow
- Error Responses
- Data Model
- Notes & Future Improvements

---

## Overview
This service implements:
- Product entity: id, name, price
- Order entity: id, productId (FK → Product), quantity
- REST endpoints for creating/listing products and orders
- Report endpoint for top products by totalSold (sum of quantities)

---

## Requirements
- Node.js LTS (v18+ recommended)
- npm or yarn
- PostgreSQL 13+ (local or remote)
- Optional: Docker to run PostgreSQL locally

---

## Environment Variables

Use the following variables (e.g., in a `.env` file):

Your example (as requested):
\`\`\`
POSTGRES_HOST=localhostPOSTGRES_PORT=5432POSTGRES_USER=<username>POSTGRES_PASSWORD=<password>POSTGRES_DB=<db-name>
\`\`\`

Typical .env layout (copy/paste friendly):
\`\`\`
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db-name>
# Optional app settings:
# PORT=3000
# NODE_ENV=development
\`\`\`

Tips:
- Ensure the database exists and the user has permissions.
- If using a connection string approach, you can expose it as DATABASE_URL (if your project supports it).

---

## Quick Start

1) Install dependencies
\`\`\`bash
npm install
# or
yarn
\`\`\`

2) Configure environment
- Create a `.env` file with the variables above.

3) Ensure PostgreSQL is running
- Create the database named in `POSTGRES_DB`.
- If the app uses TypeORM sync/migrations, ensure they run on startup (or run migrations manually if provided).

4) Run the server
\`\`\`bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start
\`\`\`

5) Health check
- Use the curl examples below to interact with the API at `http://localhost:3000` (or your configured PORT).

---

## Running with Docker (optional)

Start PostgreSQL locally:
\`\`\`bash
docker run --name nest-pg \
  -e POSTGRES_USER=<username> \
  -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=<db-name> \
  -p 5432:5432 -d postgres:15
\`\`\`

Set your `.env` accordingly:
\`\`\`
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db-name>
\`\`\`

---

## API Reference

Base URL: `http://localhost:3000`  
Content-Type: `application/json`

### Products

1) Create Product
- Endpoint: `POST /products`
- Request Body:
\`\`\`json
{
  "name": "Widget",
  "price": 19.99
}
\`\`\`
- Response: `201 Created`
\`\`\`json
{
  "id": 1,
  "name": "Widget",
  "price": 19.99
}
\`\`\`
- curl:
\`\`\`bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Widget","price":19.99}'
\`\`\`

2) List Products
- Endpoint: `GET /products`
- Response: `200 OK`
\`\`\`json
[
  { "id": 1, "name": "Widget", "price": 19.99 },
  { "id": 2, "name": "Gadget", "price": 29.5 }
]
\`\`\`
- curl:
\`\`\`bash
curl http://localhost:3000/products
\`\`\`

---

### Orders

1) Create Order
- Endpoint: `POST /orders`
- Request Body:
\`\`\`json
{
  "productId": 1,
  "quantity": 3
}
\`\`\`
- Response: `201 Created`
\`\`\`json
{
  "id": 1,
  "productId": 1,
  "quantity": 3
}
\`\`\`
- curl:
\`\`\`bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":3}'
\`\`\`

2) List Orders
- Endpoint: `GET /orders`
- Response: `200 OK`
\`\`\`json
[
  { "id": 1, "productId": 1, "quantity": 3 },
  { "id": 2, "productId": 2, "quantity": 5 }
]
\`\`\`
- curl:
\`\`\`bash
curl http://localhost:3000/orders
\`\`\`

---

### Reports

Top Products Report
- Endpoint: `GET /reports/top-products?limit=N`
- Query Params:
  - `limit` (number, optional; default `5`)
- Description: Sums `quantity` by `productId`, joins `name`, sorts by `totalSold` descending, and limits the result.
- Response: `200 OK`
\`\`\`json
[
  { "productId": 1, "name": "Widget", "totalSold": 8 },
  { "productId": 2, "name": "Gadget", "totalSold": 4 }
]
\`\`\`
- curl (default limit=5):
\`\`\`bash
curl "http://localhost:3000/reports/top-products"
\`\`\`
- curl (custom limit=2):
\`\`\`bash
curl "http://localhost:3000/reports/top-products?limit=2"
\`\`\`

---

## Sample Workflow

1) Create products
\`\`\`bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Widget","price":19.99}'

curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Gadget","price":29.5}'
\`\`\`

2) Create orders
\`\`\`bash
# Widget x5
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":5}'

# Gadget x3 and x1
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":2,"quantity":3}'

curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":2,"quantity":1}'
\`\`\`

3) Get top products (limit 2)
\`\`\`bash
curl "http://localhost:3000/reports/top-products?limit=2"
\`\`\`
Sample response:
\`\`\`json
[
  { "productId": 1, "name": "Widget", "totalSold": 5 },
  { "productId": 2, "name": "Gadget", "totalSold": 4 }
]
\`\`\`

---

## Error Responses

- 400 Bad Request
  - Invalid body or types (e.g., non-numeric price/quantity)
  \`\`\`json
  { "statusCode": 400, "message": "Validation failed", "error": "Bad Request" }
  \`\`\`

- 404 Not Found
  - Creating an order for a `productId` that does not exist
  \`\`\`json
  { "statusCode": 404, "message": "Product not found" }
  \`\`\`

- 409 Conflict
  - Duplicate product name (if uniqueness is enforced)
  \`\`\`json
  { "statusCode": 409, "message": "Product name already exists" }
  \`\`\`

- 500 Internal Server Error
  - Database connectivity or unexpected errors
  \`\`\`json
  { "statusCode": 500, "message": "Internal server error" }
  \`\`\`

---

## Data Model

- Product
  - `id`: number (primary key)
  - `name`: string
  - `price`: number (decimal)

- Order
  - `id`: number (primary key)
  - `productId`: number (foreign key → Product)
  - `quantity`: number (integer)

---

## Notes & Future Improvements
- DTO validation with `class-validator` and `class-transformer`.
- Migrations and seed scripts; disable auto-sync in production.
- Pagination for list endpoints.
- Unit tests for services and E2E tests for controllers.
- Authentication/authorization if needed.