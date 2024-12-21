const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://user:user@cluster0.xxuhzmu.mongodb.net/paytm')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 30
    },
    username:{
        type: String,
        required:true,
        trim:true,
        unique:true,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength:6,
        maxLength:30
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },balance:{
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account", accountSchema)

const User = mongoose.model("User", userSchema)

module.exports = {
    User,
    Account
}