# Glorexa Store

Full-stack starter e-commerce website with customer storefront and admin panel.

## Included

- Responsive customer storefront
- Product list loaded from backend
- Shopping cart with quantity controls
- Checkout/customer details form
- Orders saved in MongoDB
- Admin dashboard
- Add/delete products
- Order list with full customer details
- Order status management
- Shared backend API for frontend/admin integration
- Inventory quantity reduced when an order is placed

## Tech

- React + Vite
- Plain responsive CSS
- Express.js
- MongoDB + Mongoose

## Run locally

### 1. MongoDB
Install/start MongoDB locally or use MongoDB Atlas.

### 2. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

If using Atlas, replace `MONGODB_URI` in `.env`.

### 3. Frontend

Open another terminal:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Then open:

- Store: http://localhost:5173
- Admin: http://localhost:5173/admin

## How integration works

1. Admin adds a product -> POST `/api/products`
2. Product is saved in MongoDB
3. Store loads `/api/products` and shows it automatically
4. Customer adds items and submits checkout -> POST `/api/orders`
5. Customer details + items + total are saved in MongoDB
6. Admin loads `/api/orders` and sees all order/customer details
7. Admin can update status through PATCH `/api/orders/:id/status`

## Recommended next production steps

- Admin login/authentication
- Product edit function
- Image upload (Cloudinary/S3) instead of image URL
- Payment gateway (Stripe/Telr/PayTabs)
- Delivery charge/tax/coupons
- Search/categories/filtering
- Customer accounts
- WhatsApp/order notifications
- Deploy frontend/backend + MongoDB Atlas
