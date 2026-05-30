import { Router } from "express"

import authMiddleware from "../middleware.js"

import { accountModel } from "../db.js"
import { userModel } from "../db.js"

const accountRouter = Router();


accountRouter.get('/balance', authMiddleware , async (req,res)=> {
    const userId = req.userId;

    const account = await accountModel.findById(userId);

    const {balance} = account;

    res.status(200).json({
        balance
    });

});

// pending
accountRouter.post('/transfer', authMiddleware , async (req,res)=> {
    const userId = req.userId;
    const transfer_user_id = req.body.transfer_user_id;
    const amount = req.body.amount;

    const userExists = await userModel.findById(transfer_user_id);

    if(!userExists){
        res.status(404).send("no user exists with this id");
        return;
    };

    // transfer amount
    

});


export default accountRouter;