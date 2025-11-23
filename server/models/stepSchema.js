const mongoose=require("mongoose")
const stepSchema=new mongoose.Schema({
    number:{
       type:Number
    },
    range:{
        type:Number,
        min:0,
        max:9
    }
},{timestamps:true})
module.exports=stepSchema