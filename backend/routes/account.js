const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { mongoose } = require("mongoose");
const zod = require("zod");

const router = express.Router();

const receiverSchema = zod.object({
    amount: zod.number().refine((n) => n >= 0),
    to: zod.string()    
})

router.get("/balance",authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })

    res.json({
        balance: account.balance
    })
})

router.post("/transfer",authMiddleware,async(req,res)=>{
    try{
        const session = await mongoose.startSession();
        await session.startTransaction();

        const {amount,id} = req.body;
        const account = await Account.findOne({userId:req.userId}).session(session); //to ensure atomicity
        const {success} = receiverSchema.safeParse(req.body);

        if(success!==true){
            await session.abortTransaction();
            res.status(400).json({
                message:"Insufficient Amount"
            });
        }

        //check whether the account/balance exists
        if(!account || account.balance<amount){
            await session.abortTransaction();
            res.status(400).json({
                message:"Insufficient Balance"
            });
        }

        const toAccount = Account.findOne({userId:id}).session(session);
        
        if(!toAccount){
            await session.abortTransaction();
            res.status(400).json({
                message:"Invalid account"
            })
        };

        //perform action
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:id},{$inc:{balance:amount}}).session(session);

        await session.commitTransaction();
        res.status(200).json({
            message:"Transfer successful"
        })

    }catch(err){
        res.json({
            message:"Transfer failed"
        })
    }
})

module.exports = router