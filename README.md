# Quality Cravings Server

This is the backend server for the Quality Cravings application, built with Node.js and Express. It provides RESTful APIs for managing brands, products, testimonials, and users. The server connects to a database, handles authentication, and serves as the main data provider for the frontend client.

## Features

- User authentication and authorization
- CRUD operations for brands, products, and testimonials
- Modular route and controller structure
- Database integration
- Ready for deployment (e.g., Vercel)

## Project Structure

```
quality-cravings-server/
  src/
    app.js              # Express app setup
    server.js           # Server entry point
    config/db.js        # Database configuration
    modules/            # Feature modules (brand, product, testimonial, user)
    utils/              # Utility functions
  package.json
  README.md
  vercel.json           # Deployment configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables as needed (e.g., database URI).
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `/api/brands` - Manage brands
- `/api/products` - Manage products
- `/api/testimonials` - Manage testimonials
- `/api/users` - User registration and login

## License

MIT
