import express from 'express';
import cors from "cors";
const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
]

app.use(cors(
    {
        origin: function (origin, callback){
            if(!origin || allowedOrigins.includes(origin)){
                callback(null, true);
            } else{
                callback(new Error("Not allowed CORS"));
            }
        }, 
        credentials: true
    }
));

import { connectDB } from './db.js';
import router from "./routes/index.js"
await connectDB();
import {PORT} from "./config.js";

app.use('/api/v1', router);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

