const catchAsyncErrors = require("./catchAsyncError")
const ErrorHandler = require("../utils/errorHandler")
const jwt=require("jsonwebtoken");
const User = require("../models/userModel")

exports.isAuthenticator = catchAsyncErrors( async(req,res,next)=>{
    
    const {token}=req.cookies;

    console.log(token);

    if(!token){
        return next(new ErrorHandler("please login to access this resource"))
    }

    const decodedData =jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)
    next();
});



exports.authorizedRoles = (...rolles) =>{
    return (req,res,next)=>{

        if(!rolles.includes(req.user.rolle)){
          return next(
            new ErrorHandler(
                `Role ${req.user.rolle} is not allowed to access this resource `,403
                )
                ) 
        }
        next();
    }

}





