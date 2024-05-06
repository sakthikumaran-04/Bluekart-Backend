import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide a name"]
    },
    description:{
        type:String,
        required:[true,"please provide a description"]
    },
    price:{
        type:Number,
        required:[true,"please provide a price"]
    },
    category:{
        type:String,
        required:[true,"please provide a category"]
    },
    rating:{
        type:String,
        required:[true,"please provide a rating"]
    },
    ratingCount:{
        type:Number,
        required:[true,"please provide a rating count"]
    },
    image:{
        type:String,
        required:[true,"please provide a image"]
    }
    
})

export const Product=mongoose.model("Product",productSchema);