const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userOTPverification = new Schema({
    userId:String,
    otp:String,
    createdAt: Date,
    exprisAt:Date,
});



