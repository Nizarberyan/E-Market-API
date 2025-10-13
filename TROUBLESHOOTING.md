# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Error

**Error**: `MongoDB connection error: connect ECONNREFUSED`

**Solutions**:
- Check if MongoDB is running:
  ```bash
  sudo systemctl status mongod
  ```
- Start MongoDB:
  ```bash
  sudo systemctl start mongod
  ```
- Verify MONGODB_URI in `.env` file
- Default connection: `mongodb://localhost:27017/emarket`

### 2. Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions**:
- Change PORT in `.env` file to another port (e.g., 3001)
- Kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

### 3. Module Not Found

**Error**: `Cannot find module 'express'` or similar

**Solution**:
```bash
bun install
# or
npm install
```

### 4. Invalid Product ID

**Error**: `Invalid product ID`

**Cause**: The ID provided is not a valid MongoDB ObjectId

**Solution**: Ensure you're using a valid 24-character hex string ObjectId

### 5. Email Already Exists

**Error**: `Email already exists`

**Cause**: Trying to create a user with an email that's already in the database

**Solution**: Use a different email or delete the existing user first

### 6. Validation Errors

**Error**: `ValidationError: ...`

**Common causes**:
- Missing required fields
- Invalid data types (e.g., string instead of number)
- Invalid email format
- Negative price or stock values

**Solution**: Check the request body matches the schema requirements

### 7. Category Not Found When Creating Product

**Error**: Product creation fails or category doesn't populate

**Cause**: Invalid category ObjectId

**Solution**: 
1. Create a category first: `POST /categories`
2. Use the returned `_id` in the product's `category` field

### 8. Swagger UI Not Loading

**Error**: Cannot access `/api-docs`

**Solutions**:
- Ensure `docs/swagger.yaml` exists
- Check if `yamljs` and `swagger-ui-express` are installed
- Restart the server

### 9. Empty Response from Search

**Issue**: `/products/search` returns empty array

**Possible causes**:
- No products match the criteria
- Category ID is incorrect
- Price range excludes all products

**Solution**: 
- Try broader search criteria
- Check if products exist: `GET /products`

### 10. Password Visible in Response

**Note**: This is expected in the current version. Passwords are:
- Excluded from `GET /users` and `GET /users/:id`
- Excluded from `POST /users` response
- Not encrypted (planned for next sprint)

## Debugging Tips

### Enable Detailed Logging

The logger middleware already logs all requests. For more details:

1. Check MongoDB queries:
   ```javascript
   mongoose.set('debug', true);
   ```

2. Add console.logs in controllers for debugging

### Test with cURL

```bash
# Test if server is running
curl http://localhost:3000/products

# Test with verbose output
curl -v http://localhost:3000/products

# Test POST with data
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test category"}' \
  -v
```

### Check Database Directly

```bash
# Connect to MongoDB
mongosh

# Switch to database
use emarket

# View collections
show collections

# View products
db.products.find().pretty()

# View users
db.users.find().pretty()

# View categories
db.categories.find().pretty()
```

## Getting Help

1. Check the API documentation: http://localhost:3000/api-docs
2. Review the README.md for setup instructions
3. Check IMPLEMENTATION.md for feature details
4. Use the test script: `./test-api.sh`

## Reset Database

If you need to start fresh:

```bash
mongosh
use emarket
db.dropDatabase()
exit
```

Then restart your server.
