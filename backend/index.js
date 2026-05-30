import express from 'express';
const app = express();
app.use(express.json());

import { connectDB } from './db.js';
import router from "./routes/index.js"
// import { JWT_SECRET } from './config.js';
await connectDB();

app.use('/api/v1', router);
app.listen(3000, () => console.log('server started'));

