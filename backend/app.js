const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const Product =require("./router/productRouter");
const User =require("./router/userRoutes");

const errorMiddleware=require("./middleware/error")
const order =require("./router/orderRoute")


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",Product);
app.use("/api/v1",User);
app.use("/api/v1",order);

app.use(errorMiddleware)

module.exports = app;