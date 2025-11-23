const express=require('express')
const router=express.Router()
const commentController=require("../controllers/commentController")

router.get('/',commentController.getAllComments)
router.get('/:id',commentController.getCommentById)
router.post('/',commentController.createComment)
router.put('/',commentController.updateComment)
router.delete('/',commentController.deleteComment)

module.exports=router
 