# PayWallet

A PayTM-inspired full-stack wallet application that enables users to register, authenticate, view account balances, search users, and transfer money securely using JWT-based authentication and MongoDB.

## Features

* User Signup and Signin
* JWT-based Authentication
* View Account Balance
* Search Users by Name
* Transfer Money Between Users
* Secure Backend APIs
* Responsive Frontend using HTML, CSS, and JavaScript

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Tokens (JWT)

## Project Structure

```text
payment-project/
│
├── backend/
│   ├── routes/
│   ├── middleware.js
│   ├── db.js
│   ├── config.js
│   └── index.js
│
└── frontend/
    ├── css/
    ├── js/
    ├── signup.html
    ├── signin.html
    ├── dashboard.html
    └── send.html
```

## API Endpoints

### User Routes

#### Signup

```http
POST /api/v1/user/signup
```

Request Body:

```json
{
  "username": "john123",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Signin

```http
POST /api/v1/user/signin
```

Request Body:

```json
{
  "username": "john123",
  "password": "password123"
}
```

### Account Routes

#### Get Balance

```http
GET /api/v1/account/balance
```

Headers:

```http
token: <jwt_token>
```

#### Transfer Money

```http
POST /api/v1/account/transfer
```

Headers:

```http
token: <jwt_token>
```

Request Body:

```json
{
  "transfer_user_id": "user_id",
  "amount": 500
}
```

### User Search

```http
GET /api/v1/user/bulk?filter=<name>
```

## Installation & Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd payment-project
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start Server

```bash
npm start
```

The application will run on:

```text
http://localhost:3000
```

## Future Improvements

* Password Hashing using bcrypt
* Transaction History
* Profile Management
* Real-Time Notifications
* Account Statements
* Pagination for User Search
* Better UI/UX

## Learning Outcomes

Through this project, I gained hands-on experience with:

* REST API Development
* MongoDB and Mongoose
* JWT Authentication
* Express Middleware
* Frontend-Backend Integration
* CRUD Operations
* Client-Side State Management using Local Storage

## Author

Shachi Shukla
