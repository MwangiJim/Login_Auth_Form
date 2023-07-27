import mongoose from "mongoose";

const users = mongoose.Schema({
    Email:String,
    Name:String,
    Password:String,
    Country:String,
    phoneNumber:String,
    Role:String,
    userType:String
})

export default mongoose.model('Users',users)