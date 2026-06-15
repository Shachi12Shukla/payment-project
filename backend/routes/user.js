import { Router } from "express"
import jwt from "jsonwebtoken"
import zod from "zod"

import { userModel , accountModel } from "../db.js"

import { JWT_SECRET } from "../config.js"

import authMiddleware from "../middleware.js"

const userRouter = Router();

userRouter.post('/signup' , async (req,res) => {
    const {username, password, firstName, lastName} = req.body;

    const userExists = await userModel.findOne({username: username});

    if(userExists){
        res.status(403).send("user already exists");
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

    console.log(userExists);

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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    username: zod.string().optional()
})

userRouter.put('/', authMiddleware, async (req,res)=> {

    const parsedBody = updateBody.safeParse(req.body);

    if(!parsedBody.success){
        res.status(411).send("Error while updating information");
        return;
    }

    const userId = req.userId;

    await userModel.findByIdAndUpdate(userId, parsedBody.data);

    res.status(200).json({
        message: "Information updated successfully"
    });
});


userRouter.get('/bulk', async (req,res)=> {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [{
            firstName: {
                "$regex" : filter
            }
        }, {
            lastName: {
                "$regex" : filter
            }
        }]
    });

    res.json({
        user: users.map( user => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    })


});


export default userRouter;