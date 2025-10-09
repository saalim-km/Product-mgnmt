# Simple Backend: Products, Orders, Top Products

What is this?

- A tiny API to create/list products and orders
- A report to see top products by total quantity sold


Features

- Add and list products
- Add and list orders
- Get top products report


Requirements

- Node.js 18+
- npm or yarn
- PostgreSQL 13+ (local or remote)
- Optional: Docker (for local Postgres)


Setup

1. Install dependencies


```shellscript
npm install
# or
yarn
```

2. Create a PostgreSQL database (name it as in your env vars)
3. Add environment variables (see below)


Environment variables
Create a .env file in the project root (pick one method):

Option A: Separate fields

```plaintext
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<db-name>

Option B: Single connection string
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<db-name>
```

Notes:

- Ensure the database exists and your user has access
- Use either the separate fields or DATABASE_URL (not both, unless your app supports it)


Run
Development (watch mode):

```shellscript
npm run start:dev
```

Production:

```shellscript
npm run build
npm run start
```

Base URL: [http://localhost:3000](http://localhost:3000)All endpoints use application/json

API (quick reference)

# Products

Create product

- POST /products
- Body:

```json
{ "name": "Widget", "price": 19.99 }
```





List products

- GET /products
```json
[
    {
        "id": 1,
        "name": "Product A",
        "price": 120.5
    },
    {
        "id": 2,
        "name": "Product B",
        "price": 80
    }
]
```




# Orders

Create order

- POST /orders
- Body:

```json
{ "productId": 1, "quantity": 3 }
```





List orders

- GET /orders
```json
[
    {
        "id": 1,
        "quantity": 15,
        "product": {
            "id": 1,
            "name": "Proudct 1",
            "price": "1499.99"
        }
    },
    {
        "id": 2,
        "quantity": 5,
        "product": {
            "id": 2,
            "name": "Proudct 2",
            "price": "1899.99"
        }
    }
]
```




# Reports

- Top products

- GET /reports/top-products?limit=N (default 5)
- Returns:

```json
[ { "productId": 1, "name": "Widget", "totalSold": 8 } ]
```







Quick try (cURL)

Create products:

```shellscript
curl -X POST http://localhost:3000/products
  "Content-Type: application/json"
  '{"name":"Widget","price":19.99}'

curl -X POST http://localhost:3000/products
  "Content-Type: application/json"
  '{"name":"Gadget","price":29.5}'
```

Create orders:

```shellscript
curl -X POST http://localhost:3000/orders
  "Content-Type: application/json"
  '{"productId":1,"quantity":5}'

curl -X POST http://localhost:3000/orders 
  "Content-Type: application/json" 
  '{"productId":2,"quantity":3}'
```

Top products:

```shellscript
curl "http://localhost:3000/reports/top-products?limit=2"
```

Common issues

- 400: Invalid request body or types
- 404: Product not found (when creating an order)
- 409: Duplicate product name (if enforced)
- 500: Database or unexpected error


Data model

- Product: id (number), name (string), price (number)
- Order: id (number), productId (number), quantity (number)


Postman collection

- Open Postman → Import → Paste this URL:
- [https://develepors.postman.co/workspace/develepors-Workspace~0ff4a7a1-acbf-4377-8a53-f2a91fe2566e/collection/42617517-beba4d29-52aa-4d97-9ea5-8993668ad2bf?action=share&creator=42617517](https://develepors.postman.co/workspace/develepors-Workspace~0ff4a7a1-acbf-4377-8a53-f2a91fe2566e/collection/42617517-beba4d29-52aa-4d97-9ea5-8993668ad2bf?action=share&creator=42617517)
