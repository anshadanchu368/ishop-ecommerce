const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    desc:{
        type:String,
        required:[true,"please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        MaxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        // required:[true,"Please Enter Product category"]
    },
    stock:{
        type:Number,
        // required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                // required:true,
            },
            rating:{
                type:Number,
                // required:true,
            },
            comment:{
                type:String,
                // required:true
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports =mongoose.model("Product", productSchema)