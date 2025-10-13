# E-Market API

A Node.js/Express e-commerce API server with basic product and user management, MongoDB persistence, and modular architecture.

## 🏷️ Technologies

- **Node.js**
- **Express.js**
- **Yup.js** (Data Validation)
- **MongoDB**
- **Mongoose**
- **JavaScript**
- **Bun** (Package Manager)
- **Swagger/OpenAPI** (API Documentation)
- **Git**

## 📋 Project Context

The company aims to design a scalable e-commerce platform capable of managing products, users, and orders.

Before tackling the complete business logic, we need to establish the technical foundations of the backend:

- A functional Express server
- A MongoDB database connection
- Initial routes for products and users

This project marks the transition to real REST API-oriented backend development, with an initial approach to data persistence and professional code structure (routes, controllers, models, middlewares).

The goal is to have a stable and modular server that will serve as a foundation for more advanced features (complete CRUD, JWT authentication, order management, etc.) planned in the following sprint briefs.

## 🎯 Main Objectives

- Create a functional and modular Express server
- Organize the project according to a simplified MVC architecture
- Implement basic REST routes for:
    - `/products` → product management
    - `/users` → user management
- Connect the server to MongoDB via Mongoose
- Swagger documentation for the API

## 📦 Minimum Features

### 🛍️ Product Management (`/products`)

Products are the central elements of the platform.

Each product is stored in MongoDB with the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | ✅ | Product name |
| description | String | ✅ | Brief product description |
| price | Number | ✅ | Product price (in DH) |
| stock | Number | ✅ | Available quantity |
| category | String | ✅ | Product category (e.g., "Electronics", "Fashion") |
| imageUrl | String | ❌ | Product image link |
| createdAt | Date | Auto | Creation date (managed by Mongoose) |

#### Routes to Implement

- `GET /products` → returns the list of all products
- `GET /products/:id` → returns details of a specific product
- `POST /products` → adds a new product (with required field validation)
- `PUT /products/:id` → updates an existing product
- `DELETE /products/:id` → deletes a product

#### Rules and Validations

- Type checking (price and stock must be numeric)
- Properly handled errors (product not found, missing field, invalid id)
- No real image persistence for now (simple simulated URL)

### 👥 User Management (`/users`)

Users are registered in the database to simulate accounts for the future e-commerce platform.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullname | String | ✅ | User's full name |
| email | String | ✅ | Unique email |
| password | String | ✅ | Password (not encrypted for now) |
| role | String | ❌ | Default value: "user" (can be "admin") |
| createdAt | Date | Auto | Registration date |

#### Routes to Implement

- `GET /users` → returns the list of users
- `GET /users/:id` → returns information about a specific user
- `POST /users` → creates a user after verifying email uniqueness
- `DELETE /users/:id` → deletes a user (optional, bonus)

#### Rules and Validations

- Check that email doesn't already exist before insertion
- Required fields: fullname, email, password
- Structure ready to integrate encryption and JWT authentication in the next brief

### ⚙️ Middleware & Structure

- **Logger middleware**: logs the method, URL, and date of each request
- **errorHandler middleware**: captures and returns errors in JSON format
- **notFound middleware**: standard JSON message for non-existent routes

## 💡 Bonus Features

- Implement a relationship between products and categories by creating a separate `categories` collection, and associating each product with a category via a MongoDB reference (ObjectId)
- Add CRUD routes to manage categories
- Add a filtered search route (`/products/search`) allowing product search based on various criteria (categories, name, minimum and maximum price, etc.)

## 🚨 Technical Requirements

### Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- Dotenv (environment variable management)
- Swagger/OpenAPI for documentation

### Expected Best Practices

- Respect REST logic
- Async/await functions with try/catch error handling
- Well-commented and modular code
- Consistent use of HTTP status codes (200, 201, 404, 500, etc.)
- Integrate a Swagger/OpenAPI documentation file and indicate the exposed URL to view it (e.g., `/api-docs`)

## 📚 API Documentation

Once implemented, the API documentation will be available at:
```
http://localhost:PORT/api-docs
```

The Swagger specification is located in `docs/swagger.yaml`.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Bun package manager (optional)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd e-market-api
```

2. Install dependencies
```bash
bun install
# or
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/emarket
NODE_ENV=development
```

4. Start the server
```bash
bun run server.js
# or
npm start
```

5. Access the API documentation
```
http://localhost:3000/api-docs
```

## 📝 Project Structure

```
e-market-api/
├── bun.lock                    # Bun lock file
├── docs/
│   └── swagger.yaml           # OpenAPI/Swagger specification
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
├── server.js                  # Entry point
└── src/
    ├── app.js                 # Express app configuration
    ├── config/
    │   └── db.js             # MongoDB connection setup
    ├── controllers/
    │   ├── productController.js  # Product business logic
    │   └── userController.js     # User business logic
    ├── middlewares/
    │   ├── errorHandler.js   # Global error handling
    │   ├── logger.js         # Request logging
    │   └── notFound.js       # 404 handler
    ├── models/
    │   ├── Category.js       # Category schema (bonus)
    │   ├── Product.js        # Product schema
    │   └── User.js           # User schema
    ├── routes/
    │   ├── productRoutes.js  # Product endpoints
    │   └── userRoutes.js     # User endpoints
    ├── swagger.js            # Swagger configuration
    └── utils/
        └── validators.js     # Input validation utilities
```

## 🛠️ Available Scripts

```bash
# Start the server
bun run server.js
# or
npm start

# Start in development mode with auto-reload (if configured)
npm run dev
```

## 🧪 Testing the API

You can test the API using:

- **Swagger UI**: `http://localhost:PORT/api-docs`
- **Postman**: Import the OpenAPI spec from `docs/swagger.yaml`
- **cURL**: Command line requests
- **Thunder Client/REST Client**: VS Code extensions

### Example Requests

#### Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Laptop",
    "description": "High-performance laptop",
    "price": 8999,
    "stock": 10,
    "category": "Electronics"
  }'
```

#### Get All Products
```bash
curl http://localhost:3000/products
```

#### Create a User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/emarket

# Future configurations (for next sprints)
# JWT_SECRET=your_secret_key
# JWT_EXPIRE=7d
```

## 🔄 Next Steps

This project serves as the foundation. Future sprints will include:

- JWT Authentication & Authorization
- Password encryption (bcrypt)
- Complete order management system
- Payment integration
- File upload for product images
- Advanced search and filtering
- Rate limiting and security middleware
- Unit and integration tests

## 📄 License

GNU General Public License v3.0

---

For questions or issues, please open an issue in the repository.