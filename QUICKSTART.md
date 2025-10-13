# Quick Start Guide

## Prerequisites
- MongoDB running on `mongodb://localhost:27017`
- Node.js v14+ or Bun installed

## Setup Steps

1. **Install dependencies** (already done):
```bash
bun install
```

2. **Start MongoDB** (if not running):
```bash
# On Linux/macOS
sudo systemctl start mongod
# or
mongod

# On Windows
net start MongoDB
```

3. **Start the server**:
```bash
bun run server.js
```

4. **Access the API**:
- API Documentation: http://localhost:3000/api-docs
- Base URL: http://localhost:3000

## First Steps

### 1. Create a Category
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and accessories"
  }'
```

### 2. Create a Product (use the category ID from step 1)
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop",
    "description": "High-performance laptop",
    "price": 8999,
    "stock": 10,
    "category": "YOUR_CATEGORY_ID_HERE",
    "imageUrl": "https://example.com/laptop.jpg"
  }'
```

### 3. Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Get All Products
```bash
curl http://localhost:3000/products
```

### 5. Search Products
```bash
curl "http://localhost:3000/products/search?name=laptop&minPrice=5000&maxPrice=10000"
```

## Available Endpoints

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /products/search` - Search products

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create user
- `DELETE /users/:id` - Delete user

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Default: `mongodb://localhost:27017/emarket`

### Port Already in Use
- Change PORT in .env file
- Default: 3000

### Module Not Found
- Run `bun install` again
- Check package.json dependencies
