import { Router } from "express"
import jwt from "jsonwebtoken"

import { userModel } from "../db.js"
import { accountModel } from "../db.js"

import { JWT_SECRET } from "../config.js"

import authMiddleware from "../middleware.js"

const userRouter = Router();

userRouter.post('/signup' , async (req,res) => {
    const {username, password, firstName, lastName} = req.body;

    const userExists = await userModel.findOne({username});

    if(userExists){
        res.status(403).send("username already exists");
        return;
    }

    const newUser = await userModel.create({
        username,
        password,
        firstName,
        lastName
    });

    const newAccount = await accountModel.create({
        balance: Math.floor(Math.random() * 15000) + 1,
        userId: newUser._id
    });

    res.status(201).json({
        id: newUser._id,
        message: "You have signed up"
    });
 
});

userRouter.post('/signin', async (req,res) => {
    const {username, password} = req.body;

    const userExists = await userModel.findOne({
        username,
        password
    });

    if(!userExists){
        res.status(403).send("Incorrect credentials");
        return;
    };

    const token = jwt.sign({
        userId: userExists._id
    },JWT_SECRET);

    res.status(200).json({
        token,
        message: "Logged in"
    });
});

// empty
userRouter.put('/', authMiddleware, async (req,res)=> {
    const userId = req.userId;
});

// empty
userRouter.get('/bulk', async (req,res)=> {
    const filter = req.query.filter;

    
});


export default userRouter;