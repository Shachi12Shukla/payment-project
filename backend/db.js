import mongoose from 'mongoose'
import ref from 'process'

import {MONGO_URI} from './config.js'

// Connect to DB
export const connectDB = async () => {
    mongoose.connect(MONGO_URI)
        .then( ()=> console.log('Connected to DB'))
        .catch( (err)=> console.log('Connection error - ', err));
}


// Schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    balance: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

// Models
export const userModel = mongoose.model("user", userSchema);
export const accountModel = mongoose.model("account", accountSchema);

