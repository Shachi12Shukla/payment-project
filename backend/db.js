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
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    balance: {
        type:Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

// Models
export const userModel = mongoose.model("user", userSchema);
export const accountModel = mongoose.model("account", accountSchema);

