const Comment = require("../models/Comment")

const getAllComments=async(req,res)=>{
  const comments= await Comment.find().lean()
  if(!comments){
  return res.status(400).json({message:'no comments found'})
  }
  res.json(comments)
}

const getCommentById=async(req,res)=>{
    const{id}=req.params
    const comment=await Comment.findById(id).lean()
    if(!comment){
        return res.status(404).json({message: "id not exist"})
    }
    else{
        return res.status(201).json(comment)
    }
}

const createComment=async(req,res)=>{
    const {name,body}= req.body
    if(!name||!body){
        return res.status(400).json({message:'name,body are required'})
    }
    const newComment=await Comment.create({name,body})
    if(newComment){
        return res.status(201).json({message: "new comment created"})
    }
    else{
        return res.status(400).json({message: "invalid comment"})
    }

}

const updateComment=async(req,res)=>{
    const {_id,name,body}= req.body
    if(!_id||!name||!body){
        return res.status(400).json({message:'_id,name,body are required'})
    }
    const comment=await Comment.findById(_id)
    if(!comment){
        return res.status(400).json({message:'comment not found'})   
    }
    comment.name=name
    comment.body=body
    const updatedComment=await comment.save()
    res.json(`${updatedComment.name} updated`)
}

const deleteComment=async (req,res)=>{
    const {id}=req.body
    const comment=await Comment.findById(id)
    if(!comment){
        return res.status(400).json({message:'comment not found'})
    }
    const name=comment.name
    const result =await comment.deleteOne()
    res.json(`${name} deleted`)
}

module.exports={getAllComments,createComment,getCommentById,updateComment,deleteComment}
