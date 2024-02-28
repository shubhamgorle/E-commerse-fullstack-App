const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const uerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [5, "Name Should have more than 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greter than 8 chararters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
// note --> we cannot use this inside arrow function.
// if password is same as before means it is not modified again then we will not bcrypt the pass
// this case will use when user change the pass if pass change then only it will brypt the pass else it will not .
// agar pass change nhi hua hai to pasword brypt nhi krna next kr dena if hua hai to usko brypt krna
uerSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    console.log("working",this.password)
})

// JWt token;
uerSchema.methods.getJWTToken = function () {
    //  return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRE
    return jwt.sign({ id: this._id }, "7yh5632921hiu2h1ui", {
        expiresIn: "5d"
    })
}
// compare password;
uerSchema.methods.comparePassWord = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
}
// console.log(process.env.JWT_EXPIRE)
module.exports = mongoose.model("User", uerSchema)