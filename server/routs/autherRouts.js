const express=require('express')
const router=express.Router()
const authercontroller=require('../controllers/autherController')

router.post('/login',authercontroller.login)
router.post('/register',authercontroller.register)

module.exports=router