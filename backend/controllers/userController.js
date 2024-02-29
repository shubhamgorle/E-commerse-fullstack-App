const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncError = require('../middleware/catchAsyncErrors');
const User = require("../models/userModel.js");
const sendtoken = require("../utils/jwttoken.js");
const sendEmail = require("../utils/sendEmail.js");

exports.registerUser = catchAsyncError(
  async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
      name, email, password,
      avatar: {
        public_id: "this is sample id",
        url: "profileurl"
      }
    })

    sendtoken(user, 200, res);
  }
)



exports.loginUser = catchAsyncError(async (req, res, next) => {

  const { email, password } = req.body;
  // check if user has given pass and email both;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400))
  }
  // in userschema we gave false property to password thats why we didnt write password directly inside the object 
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  const isPasswordMatch = await user.comparePassWord(password);
  console.log("isPasswordMatch", isPasswordMatch)

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401))
  }
  else {
    sendtoken(user, 200, res)
  }
})

// LogoutUser

exports.logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully"
  })
})


// forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found", 404))
  }

  // get reset password TOKEN

  const resetToken = user.getResetPasswordToken();
  // console.log('reset', resetToken);
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
  const message = `your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, ignore it`

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerse Password Recovery",
      message,
    })
    res.status(200).json({
      success: true,
      message: `email send to ${user.email} successfully`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500))
  }
})
