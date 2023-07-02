const dotenv=require("dotenv");
const app=require("./app");
const connectDB=require("./config/databse.js")

dotenv.config({path:"backend/config/.env"})

connectDB()

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})

//unhandled promise rejections

process.on("unhandleRejection",err=>{
    console.log(`error:${err.message}`);
    console.log(`shutting down server due to unhandled promise rejections`);

    server.close(()=>{
        process.exit(1);
    });
  });