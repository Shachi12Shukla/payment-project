import { Router } from "express"
import jwt from "jsonwebtoken"
import zod from "zod"
import bcrypt from "bcrypt"

import { userModel , accountModel } from "../db.js"

import { JWT_SECRET } from "../config.js"

import authMiddleware from "../middleware.js"

const userRouter = Router();

userRouter.post('/signup' , async (req,res) => {
    const {username, password, firstName, lastName} = req.body;

    const userExists = await userModel.findOne({username: username});

    if(userExists){
        res.status(403).json({
            message: "User already exists"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        password: hashedPassword,
        firstName,
        lastName
    });

    const newAccount = await accountModel.create({
        balance: Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000,
        userId: newUser._id
    });

    res.status(201).json({
        id: newUser._id,
        newUser: newUser.username,
        userBalance: newAccount.balance,
        message: "You have signed up"
    });
 
});

userRouter.post('/signin', async (req,res) => {
    const {username, password} = req.body;

    const user = await userModel.findOne({
        username
    });


    if(!user){
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;
    };

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        return res.status(401).json({
            message: "Incorrect credentials"
        });
    }

    const token = jwt.sign({
        userId: user._id
    },JWT_SECRET, {
        "expiresIn" : "7d"
    });


    res.status(200).json({
        token,
        user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
            
        },
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

    const updatedInfo = await userModel.findByIdAndUpdate(userId, parsedBody.data);

    res.status(200).json({
        updatedInfo,
        message: "Information updated successfully"
    });
});


userRouter.get('/bulk', authMiddleware, async (req,res)=> {
    const filter = req.query.filter || "";
    const userId = req.userId;

    const users = await userModel.find({
        _id: {$ne: userId},

        $or: [{
            firstName: {
                "$regex" : filter
            }
        }, {
            lastName: {
                "$regex" : filter
            }
        },  {  
            username: {
                "$regex":  filter
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