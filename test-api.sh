#!/bin/bash

# E-Market API Test Script
# This script helps you test the API endpoints quickly

BASE_URL="http://localhost:3000"

echo "🧪 E-Market API Test Script"
echo "============================"
echo ""

# Test 1: Create Category
echo "1️⃣  Creating a category..."
CATEGORY_RESPONSE=$(curl -s -X POST $BASE_URL/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and accessories"
  }')

CATEGORY_ID=$(echo $CATEGORY_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo "✅ Category created with ID: $CATEGORY_ID"
echo ""

# Test 2: Create Product
echo "2️⃣  Creating a product..."
curl -s -X POST $BASE_URL/products \
  -H "Content-Type: application/json" \
  -d "{
    \"title\": \"Laptop\",
    \"description\": \"High-performance laptop\",
    \"price\": 8999,
    \"stock\": 10,
    \"category\": \"$CATEGORY_ID\",
    \"imageUrl\": \"https://example.com/laptop.jpg\"
  }" | jq '.'
echo ""

# Test 3: Create User
echo "3️⃣  Creating a user..."
curl -s -X POST $BASE_URL/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }' | jq '.'
echo ""

# Test 4: Get All Products
echo "4️⃣  Getting all products..."
curl -s $BASE_URL/products | jq '.'
echo ""

# Test 5: Get All Users
echo "5️⃣  Getting all users..."
curl -s $BASE_URL/users | jq '.'
echo ""

# Test 6: Get All Categories
echo "6️⃣  Getting all categories..."
curl -s $BASE_URL/categories | jq '.'
echo ""

echo "✅ All tests completed!"
echo "📚 View API docs at: $BASE_URL/api-docs"
