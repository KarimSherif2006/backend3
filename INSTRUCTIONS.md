# Project Instructions

This document provides instructions on how to run the frontend and backend servers, and how to test the backend API using Postman.

## Running the Application

### Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    If you haven't already, install the necessary npm packages.
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```
    The backend server will start on port 5000.

### Frontend

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    If you haven't already, install the necessary npm packages.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    ng serve
    ```
    The frontend development server will start on port 4200. You can access the application by navigating to `http://localhost:4200` in your browser.

## Testing with Postman

Postman is a great tool for testing APIs. Here's how you can use it to test the backend endpoints.

### 1. Signup

*   **Method:** `POST`
*   **URL:** `http://localhost:5000/users/signup`
*   **Body:** Select `raw` and `JSON`.
    ```json
    {
      "name": "Test User",
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*   **Action:** Click "Send". You should receive a success message.

### 2. Login

*   **Method:** `POST`
*   **URL:** `http://localhost:5000/users/login`
*   **Body:** Select `raw` and `JSON`.
    ```json
    {
      "email": "test@example.com",
      "password": "password123"
    }
    ```
*   **Action:** Click "Send". You should receive a response containing a JWT token.

### 3. Get Products

*   **Method:** `GET`
*   **URL:** `http://localhost:5000/products`
*   **Action:** Click "Send". You should receive a list of all products.

### 4. Create a Product (Admin only)

To test this endpoint, you first need to log in as an admin user to get a token.

*   **Method:** `POST`
*   **URL:** `http://localhost:5000/products`
*   **Headers:**
    *   `Authorization`: `Bearer <your_admin_jwt_token>`
*   **Body:** Select `raw` and `JSON`.
    ```json
    {
      "name": "Classic T-Shirt",
      "description": "A comfortable and stylish t-shirt.",
      "price": 24.99,
      "category": "Men",
      "sizes": ["S", "M", "L", "XL"],
      "colors": ["Black", "White", "Gray"],
      "stock": 100,
      "imageUrl": "https://via.placeholder.com/280x200"
    }
    ```
*   **Action:** Click "Send".
