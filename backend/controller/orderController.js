const Order = require("../models/orderModels.js");
const Product = require("../models/productModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");

//create a new order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount = order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    order,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find(req.params.id);

  if ((order.orderStatus = "delivered")) {
    return next(new ErrorHandler("you have already delivered this order", 404));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.Product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}


exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404))
    }
      
    await order.deleteOne()

  
    res.status(200).json({
      success: true,
     
    });
  });