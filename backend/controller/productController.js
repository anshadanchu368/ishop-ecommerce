const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");

//admin-create
exports.createProduct = catchAsyncErrors(async (req, res, next) => {


  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage =9;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();

   let product = await apiFeature.query;


   let filteredProductsCount = product.length
  
   product = await apiFeature.query;

  res.status(200).json({
    success: true,
    product,
    productsCount,
    resultPerPage,
    filteredProductsCount
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product =await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 500));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 500));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// Create New Review or Update the review

exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{
   
  const {rating,comment,productId} =req.body;


  const review ={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  const isReview= product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

  if(isReview){
      product.reviews.forEach(rev =>{
        if(rev.user.toString()===req.user._id.toString())
        (rev.rating=rating),
        (rev.comment=comment)
      })
       

  }else{
        
    product.reviews.push(review);
    product.numOfReviews =product.reviews.length
  }

  let avg=0;
  product.ratings = product.reviews.forEach(rev=>{

         avg+=rev.rating

  })/product.reviews.length
 
  await product.save({validateBeforeSave:false});

  res.status(200).json({
    success:true,
  })
  
})

//get all reviews of single product

exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
   
const product = await Product.findById(req.query.id);

if(!product){
  return next(new ErrorHandler("Product not found", 404));
}

res.status(200).json({
  success:true,
  reviews:product.reviews,
})

});

exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{

   const product = await Product.findById(req.query.id);

   if(!product){
    return next(new ErrorHandler("product not found",404))
   }

   const reviews = product.reviews.filter(review => review._id.toString()  !== req.query.id.toString())

   let avg=0;
  const ratings = reviews.forEach(rev=>{

         avg+=rev.rating;

  })/reviews.length;

  const numOfReviews=reviews.length;

  await product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numOfReviews},{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  });

   res.status(200).json({
    success:true
   })

})