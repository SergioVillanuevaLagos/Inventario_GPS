# Inventario_GPS

A GPS-based inventory management system API built with Node.js, Express, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in a `.env` file
4. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```

The server will run on port 3000 by default.

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Test Endpoint
- **GET** `/hola` - Test endpoint that returns a simple message

### Products Endpoints (`/productos`)

#### Get All Products
- **GET** `/api/productos`
- **Description**: Retrieve all products from the database
- **Response**: Array of product objects

#### Get Product by ID
- **GET** `/api/productos/:id`
- **Description**: Retrieve a specific product by its ID
- **Parameters**: `id` (path parameter) - Product ID
- **Response**: Product object or 404 error if not found

#### Create New Product
- **POST** `/api/productos`
- **Description**: Create a new product
- **Body**: Product data object
- **Response**: Created product object (201 status)

#### Update Product
- **PUT** `/api/productos/:id`
- **Description**: Update an existing product
- **Parameters**: `id` (path parameter) - Product ID
- **Body**: Updated product data
- **Response**: Updated product object or 404 error if not found

#### Delete Product
- **DELETE** `/api/productos/:id`
- **Description**: Delete a product
- **Parameters**: `id` (path parameter) - Product ID
- **Response**: Success message or 404 error if not found

### Storage/Warehouse Endpoints (`/bodegas`)

#### Get All Warehouses
- **GET** `/api/bodegas`
- **Description**: Retrieve all warehouses from the database
- **Response**: Array of warehouse objects

#### Get Warehouse by ID
- **GET** `/api/bodegas/:id`
- **Description**: Retrieve a specific warehouse by its ID
- **Parameters**: `id` (path parameter) - Warehouse ID
- **Response**: Warehouse object or 404 error if not found

#### Create New Warehouse
- **POST** `/api/bodegas`
- **Description**: Create a new warehouse
- **Body**: Warehouse data object (personid will be converted to string)
- **Response**: Created warehouse object (201 status)

#### Update Warehouse
- **PUT** `/api/bodegas/:id`
- **Description**: Update an existing warehouse
- **Parameters**: `id` (path parameter) - Warehouse ID
- **Body**: Updated warehouse data
- **Response**: Updated warehouse object or 404 error if not found

#### Delete Warehouse
- **DELETE** `/api/bodegas/:id`
- **Description**: Delete a warehouse
- **Parameters**: `id` (path parameter) - Warehouse ID
- **Response**: Success message or 404 error if not found

#### Get Lots by Warehouse
- **GET** `/api/bodegas/:id/lotes`
- **Description**: Retrieve all lots in a specific warehouse with product information
- **Parameters**: `id` (path parameter) - Warehouse ID
- **Response**: Object containing warehouse name, total lots count, and detailed lot information

#### Get Warehouse Inventory
- **GET** `/api/bodegas/:id/inventario`
- **Description**: Get detailed inventory by product and lot for a specific warehouse
- **Parameters**: `id` (path parameter) - Warehouse ID
- **Response**: Object containing warehouse name and detailed inventory grouped by product

### Lot Endpoints (`/lotes`)

#### Get All Lots
- **GET** `/api/lotes`
- **Description**: Retrieve all lots from the database
- **Response**: Array of lot objects

#### Get Lot by ID
- **GET** `/api/lotes/:id`
- **Description**: Retrieve a specific lot by its ID
- **Parameters**: `id` (path parameter) - Lot ID
- **Response**: Lot object or 404 error if not found

#### Create New Lot
- **POST** `/api/lotes`
- **Description**: Create a new lot
- **Body**: Lot data object
- **Response**: Created lot object (201 status)

#### Update Lot
- **PUT** `/api/lotes/:id`
- **Description**: Update an existing lot
- **Parameters**: `id` (path parameter) - Lot ID
- **Body**: Updated lot data
- **Response**: Updated lot object or 404 error if not found

#### Delete Lot
- **DELETE** `/api/lotes/:id`
- **Description**: Delete a lot
- **Parameters**: `id` (path parameter) - Lot ID
- **Response**: Success message or 404 error if not found

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **Jest** - Testing framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Inventario_GPS-main/
├── config/          # Database configuration
├── controllers/     # Business logic controllers
├── models/          # Database models
├── routes/          # API route definitions
├── test/           # Test files
├── server.js       # Main application file
└── package.json    # Dependencies and scripts
```

## 🔧 Environment Variables

Create a `.env` file with the following variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production/test)
- Database connection variables (configure according to your PostgreSQL setup)