const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const login=async(req,res)=>{
const {userName,password}=req.body
if(!userName||!password)
    return res.status(400).json({message:'All fileds are requied'})
console.log('userName from client:', userName);
const foundUser=await User.findOne({userName}).lean()
if(!foundUser||!foundUser.active)
   return res.status(409).json({message:'Unautherized'})
const match=await bcrypt.compare(password,foundUser.password)
console.log('Input password:', password);
console.log('Stored hash:', foundUser.password);

if(!match)
    return res.status(401).json({message:'Unautherized'})

const userInfo={
    _id:foundUser._id,
    userName:foundUser.userName,
    name:foundUser.name,
    email:foundUser.email,
    phone:foundUser.phone,
    roles:foundUser.roles,
}
const token=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
console.log('userInfo:', userInfo);
 res.json({token:token})
}



const register=async(req,res)=>{
    const {userName,password,name,email,phone,active}=req.body
    if(!userName||!password||!name)
        return res.status(400).json({message:'All field are requied'})
    const duplicate=await User.findOne({userName:userName}).lean()
    if(duplicate)
        return res.status(409).json({message:'Duplicate userName'})
    const hashedPwd=await bcrypt.hash(password,10)
    const userObject={name,email,userName,phone,active,password:hashedPwd}
    const user=await User.create(userObject)
    if(user)
        return res.status(201).json({message:`new user ${user.userName}`})
    else
        return res.status(404).json({message:'invalid user received'})
}

module.exports={login,register}