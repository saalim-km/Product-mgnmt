# Simple Backend: Products, Orders, and Top Products Report

A small backend that lets you:
- Add and list products
- Add and list orders
- See a “top products” report by total quantity sold

Use this to quickly test product/order flows and get a basic sales ranking.

## Contents
- Overview
- Requirements
- Setup
- Environment variables
- Run the app
- API reference
  - Products
  - Orders
  - Reports
- Sample workflow
- Common errors
- Data model
- Postman collection
- Next steps

## Overview
This service stores products and orders in a PostgreSQL database and provides a report that totals quantities sold per product. It’s built for quick testing and simple demos.

## Requirements
- Node.js 18+
- npm or yarn
- PostgreSQL 13+ (local or remote)
- Optional: Docker (if you want to run PostgreSQL locally)

## Setup
1) Install dependencies
\`\`\`bash
npm install
# or
yarn
\`\`\`

2) Create the database in PostgreSQL (match the name you set in your env vars).

3) Add environment variables (see below).

## Environment variables
Create a `.env` file in the project root:
\`\`\`env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db-name>

# Optional:
# PORT=3000
# NODE_ENV=development
\`\`\`

Tips:
- Make sure the database exists and the user has access.
- If you prefer a single connection string, use `DATABASE_URL` if your setup supports it.

## Run the app
Development (watch mode):
\`\`\`bash
npm run start:dev
\`\`\`

Production:
\`\`\`bash
npm run build
npm run start
\`\`\`

Base URL: `http://localhost:3000`  
All endpoints use `application/json`.

## API reference

### Products
1) Create product  
POST `/products`  
Request:
\`\`\`json
{
  "name": "Widget",
  "price": 19.99
}
\`\`\`
Response (201):
\`\`\`json
{
  "id": 1,
  "name": "Widget",
  "price": 19.99
}
\`\`\`

2) List products  
GET `/products`  
Response (200):
\`\`\`json
[
  { "id": 1, "name": "Widget", "price": 19.99 },
  { "id": 2, "name": "Gadget", "price": 29.5 }
]
\`\`\`

### Orders
1) Create order  
POST `/orders`  
Request:
\`\`\`json
{
  "productId": 1,
  "quantity": 3
}
\`\`\`
Response (201):
\`\`\`json
{
  "id": 1,
  "productId": 1,
  "quantity": 3
}
\`\`\`

2) List orders  
GET `/orders`  
Response (200):
\`\`\`json
[
  { "id": 1, "productId": 1, "quantity": 3 },
  { "id": 2, "productId": 2, "quantity": 5 }
]
\`\`\`

### Reports
Top products  
GET `/reports/top-products?limit=N` (default `limit=5`)  
Response (200):
\`\`\`json
[
  { "productId": 1, "name": "Widget", "totalSold": 8 },
  { "productId": 2, "name": "Gadget", "totalSold": 4 }
]
\`\`\`

## Sample workflow
1) Create two products:
\`\`\`bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Widget","price":19.99}'

curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Gadget","price":29.5}'
\`\`\`

2) Create some orders:
\`\`\`bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":5}'

curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":2,"quantity":3}'

curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":2,"quantity":1}'
\`\`\`

3) Get the top products report (example with limit=2):
\`\`\`bash
curl "http://localhost:3000/reports/top-products?limit=2"
\`\`\`

## Common errors
- 400 Bad Request: invalid types or body format
- 404 Not Found: product does not exist when creating an order
- 409 Conflict: duplicate product name (if uniqueness is enforced)
- 500 Internal Server Error: database or unexpected errors

## Data model
- Product
  - `id`: number
  - `name`: string
  - `price`: number
- Order
  - `id`: number
  - `productId`: number (references Product)
  - `quantity`: number

## Postman collection
Use the shared Postman collection to try the endpoints quickly:
- https://develepors.postman.co/workspace/develepors-Workspace~0ff4a7a1-acbf-4377-8a53-f2a91fe2566e/collection/42617517-beba4d29-52aa-4d97-9ea5-8993668ad2bf?action=share&creator=42617517

## Next steps
- Add request validation (e.g., name required, price/quantity positive)
- Add pagination on list endpoints
- Add migrations/seed scripts
- Add tests (unit and e2e)
- Add authentication if needed
