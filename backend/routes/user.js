const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {User, Account} = require('../db');
const { authMiddleware } = require("../middleware");
const router =  express.Router()
const { JWT_SECRET } = require("../config")

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup",async(req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    //parsing the input data 
    if(!success){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    //checking if the user exists
    const findUser = await User.findOne({
        username: req.body.username
    })

    if(findUser){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    const bal = Math.round(1+ Math.random()*10000);
    await Account.create({
        userId,
        balance: bal
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message:"User created successfully",
        token:token
    })
})


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin",async(req,res)=>{

    const body = req.body;
    const {success} = signinSchema.safeParse(body);

    if(!success){
        res.status(411).json({
            message:"Incorrect Details"
        })
    }

    const user = await User.findOne({
        username:body.username,
        password:body.password
    })

    if(user){
        const token = jwt.sign({userId:user._id},JWT_SECRET);

        res.json({
            token:token
        })
    }else{
        res.json({
            message:"Error while logging in"
        })
    }
})


const updateSchema = zod.object({
    password:zod.string(),
    firstName: zod.string(),
    lastName:zod.string()
})

router.put("/",authMiddleware,async(req,res)=>{

    const body = req.body;
    const {success} = updateSchema.safeParse(body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({_id:req.userId},body);

    res.json({
        message:"Updated successfully"
    })

})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || "";
    
    //finding the users
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;

