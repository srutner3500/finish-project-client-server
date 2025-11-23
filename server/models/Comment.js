const mongoose=require('mongoose')

const CommentSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    
},{
    timestamps: true
})

module.exports= mongoose.model("Comment",CommentSchema)