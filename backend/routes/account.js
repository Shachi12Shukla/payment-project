import { Router } from "express"

import authMiddleware from "../middleware.js"

import { accountModel } from "../db.js"
import mongoose from "mongoose";

const accountRouter = Router();


accountRouter.get('/balance', authMiddleware , async (req,res)=> {
    const userId = req.userId;

    const account = await accountModel.findOne({userId});

    res.status(200).json({
        balance: account.balance
    });

});


accountRouter.post('/transfer', authMiddleware , async (req,res)=> {
    // start session
    const session = await mongoose.startSession();

    // start transaction
    session.startTransaction();

    const userId = req.userId;
    const transfer_user_id = req.body.transfer_user_id;  
    const amount = req.body.amount;  // number

    const account = await accountModel.findOne( {userId}).session(session);
    
    // insufficient balance
    if(account.balance < amount){
        res.status(400).send("insufficient balance");
        return;
    }

    const toAccount = await accountModel.findOne({userId : transfer_user_id}).session(session);
    
    // invalid account 
    if(!toAccount){
        res.status(404).send("Invalid account");
        return;
    }

    // perform transaction
    await accountModel.updateOne({userId: userId}, {$inc: {balance: -amount} }).session(session);
    await accountModel.updateOne({userId : transfer_user_id}, {$inc: {balance: amount} }).session(session);

    // commit transaction
    await session.commitTransaction();
    res.status(200).json({
        message: "transfer successfull"
    });
    

});


export default accountRouter;
