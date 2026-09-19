# PayWallet

A PayTM-inspired full-stack wallet app for user signup/signin, balance checks, user search, and secure money transfers using JWT authentication and MongoDB.

**Live demo:** [paywallet-five.vercel.app](https://paywallet-five.vercel.app)

## Features
- Signup / Signin with JWT authentication
- View account balance
- Search users by name
- Transfer money between users
- Password hashing with bcrypt
- Secure backend APIs

## Tech Stack
MERN stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JSON Web Tokens (JWT), bcrypt
- **Other:** dotenv, CORS

## Project Structure
```
payment-project/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── user.js
│   │   │   └── account.js
│   │   ├── middleware.js
│   │   ├── db.js
│   │   ├── config.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.jsx
    └── public/
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a new user |
| POST | `/api/v1/user/signin` | Authenticate a user |
| GET | `/api/v1/user/bulk?filter=<name>` | Search users by name  (requires `token` header)|
| GET | `/api/v1/account/balance` | Get account balance (requires `token` header) |
| POST | `/api/v1/account/transfer` | Transfer money (requires `token` header) |

## Frontend Routes

| Path | Page | Access |
|---|---|---|
| `/` | Redirects to signin/dashboard | Public |
| `/user/signup` | Signup | Public |
| `/user/signin` | Signin | Public |
| `/user/dashboard` | Dashboard (balance + user search) | Protected |
| `/user/send-money` | Send Money | Protected |
| `/transfer-success` | Transfer Success | Protected |

## Setup

```bash
git clone https://github.com/Shachi12Shukla/payment-project
cd payment-project
```

**Backend:**
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
PORT=3000
```

```bash
npm start
```
Runs at `http://localhost:3000`.

**Frontend:**
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_URL=your_base_url
```

```bash
npm run dev
```

## Future Improvements
- Transaction history
- Profile management
- Real-time notifications
- Pagination for user search

## Author
Shachi Shukla