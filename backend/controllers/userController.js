const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncError = require('../middleware/catchAsyncErrors');
const User = require("../models/userModel.js");
const sendtoken = require("../utils/jwttoken.js");

exports.registerUser = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body
        const user = await User.create({
            name, email, password,
            avatar: {
              public_id:"this is sample id",
              url:"profileurl"
            }
        })

    sendtoken(user,200,res);
    }
)



exports.loginUser = catchAsyncError(async(req,res,next)=>{
     
const {email, password} = req.body;
// check if user has given pass and email both;

if(!email || !password){
         return next(new ErrorHandler("Please Enter Email & Password", 400))
}
// in userschema we gave false property to password thats why we didnt write password directly inside the object 
  const user = await User.findOne({email}).select("+password");
  if(!user){
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  const isPasswordMatch = await user.comparePassWord(password);
   console.log("isPasswordMatch",isPasswordMatch)

  if(!isPasswordMatch){
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  else{
   sendtoken(user,200,res)
  }
})




