const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors =require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const crypto = require('crypto');
const sendEmail =require("../utils/sendEmail.js")
const User =require("../models/userModel");




exports.registerUser = catchAsyncErrors( async(req,res,next)=>{

    const {name,email,password} =req.body;

    const user =await User.create({
        name,email,password,
        avatar:{
            public_id:"this is a sample id ",
            url:"profilepicUrl"
        }
    });

    sendToken(user,200,res);
});

exports.loginUser =catchAsyncErrors(async (req, res, next) => {

    const {email,password}=req.body;
  
    if(!email || !password){
      return next(new ErrorHandler("Please Enter Email & password",400))
    }
  
    const user= await User.findOne({email}).select("+password")
  
    if(!user){
      return next(new ErrorHandler("Invalid email or password",401))
    }
  
    const isPasswordMatched = await  user.comparePassword(password);
  
    if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid email or password",401));
    }
  
     sendToken(user,200,res);
  })


  // logout user

  exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{

      res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
      });

    res.status(200).json({
      success:true,
      message:"logged out",
    });
  });

  //forgot password

  exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

   const user = await User.findOne({email:req.body.email});
 
   if(!user){
    return next(new ErrorHandler("user not found",404))
   }

  //  getResetpasswordtoken

 const resetToken= user.getResetPasswordToken();
 
 await user.save({ validateBeforeSave:false});

 const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

 const message = `Your password reset token is :-\n\n  ${resetPasswordUrl}  please ignore remail if not requested`

 try{
     
  await sendEmail({
     email:user.email,
     subject:`Ecommerce Password recovery`,
     message,
  });

  res.status(200).json({
    success:true,
    message: `email sent to ${user.email} successffully`
  })
 }catch(error){
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;

  await user.save({ validateBeforeSave:false});

  return next(new ErrorHandler(error.message,500));
 }
})


exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{
   
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  })
})


exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
   
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await User.comparePassword(req.body.oldPassword);

  if(!isPasswordMatched){
      return next(new ErrorHandler("old password is incorrect",401))
  }

   if(req.body.newPassword != req.body.oldPassword){
      
    return next(new ErrorHandler("password doesnt match",401))

   }

   user.password=req.body.newPassword

   await user.save()

   sendToken(user,200,res);

 
  
})


exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
   
   const newUserDate={
     name:req.body.name,
     email:req.body.email
   }

   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
   })

   res.status(200).json({
    success:true,
   })

 
  
})

//get all users(admin)

exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{

  const users= await User.find();

  res.status(200).json({
    success:true,
    users
  })
})


//admin acces single user

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
   
    const users = await User.findById(req.params.id);

    if(!users){
      return next(new  ErrorHandler(`User Does not exist with id :${req.params.id}`));
    }


   res.status(200).json({
    success:true,
    users,
   })

 
  
})


exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
   
  const newUserDate={
    name:req.body.name,
    email:req.body.email,
    rolle:req.body.rolle
  }

  const user = await  User.findByIdAndUpdate(req.user.id,newUserData,{
     new:true,
     runValidators:true,
     useFindAndModify:false
  })

  res.status(200).json({
   success:true,
   
  })


 
})


exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
   
  const user = await User.findById(req.params.id);

  if(!user){
   return(next(new ErrorHandler(`User doesnot exist with id :${req.params.id}`)))
  }

  await user.deleteOne();

 res.status(200).json({
  success:true,
  message:"User deleted successfully"
 })
  
})


