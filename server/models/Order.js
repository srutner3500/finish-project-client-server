const mongoose=require('mongoose')

const OrderSchema=mongoose.Schema({
name:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
},
date:{
    type:Date,
    required:true,
},
address:{
    type:{
        country:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        street:{
            type:String,
            required:true
        },
        numHouse:{
            type:Number,
            required:true
        }
    },
    required:true,

},
},{
    timestamps:true
})

module.exports=mongoose.model("Order",OrderSchema)