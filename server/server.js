require ("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require('mongoose')
const corsOptions = require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const upload = require('./middleware/uploads');

connectDB()
const app=express()
const PORT=process.env.PORT||2500

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auth",require('./routs/autherRouts'))
app.use("/api/products",require("./routs/productRouts"))
app.use("/api/auth", require("./routes/auth"));
app.use('/api/user',require('./routs/userRouts'))
app.post('/api/uploads',upload.single('image'),(req,res)=>{
    res.json(req.file)
})
app.use("/api/receipt", require("./routs/receiptRoutes"))
mongoose.connection.once('open',()=>{
    console.log("connect to server success")
    app.listen(PORT,()=>{
        console.log(`server runing on port ${PORT}`)
    })
})
mongoose.connection.on('error',()=>{
    console.log("****error****")
})