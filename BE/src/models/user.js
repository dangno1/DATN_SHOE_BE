import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            minLength: 5,
        },
        fullname:{
            type:String,
            require:true
        },
        phone:{
            type:String,
            require:true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        confirmPassword:{
            type:String,
            require:true
        },
        address: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: "member",
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Number,
            default: null,
        },
    }, { timestamps: true, versionKey: false })


export default mongoose.model("User", userSchema)