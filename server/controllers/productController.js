const Product = require("../models/Product")

const getAllProducts=async(req,res)=>{
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit
  const { q } = req.query
  
  let query = {}
  if (q) {
    query = {
      productName: { $regex: q, $options: 'i' }
    }
  }
  
  const products = await Product.find(query).skip(skip).limit(limit).lean()
  const totalProducts = await Product.countDocuments(query)
  
  if(!products){
    return res.status(400).json({message:'no products found'})
  }
  
  res.json({
    products,
    totalProducts,
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    hasMore: skip + products.length < totalProducts
  })
}

const getProductById=async(req,res)=>{
    const{id}=req.params
    const product=await Product.findById(id).lean()
    if(!product){
        return res.status(404).json({message: "id not exist"})
    }
    else{
        return res.status(201).json(product)
    }
}

const createNewProduct=async(req,res)=>{
    const {productName,price,description,kategory,inventory,unitType,originalPrice }= req.body
    if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' })
    }
    const image=`/uploads/${req.file.filename}`
    if(!productName||!price||!image){
        return res.status(400).json({message:'productName,price,image are required'})
    }
    const newProduct=await Product.create({productName,price,image,description,kategory,inventory,unitType,originalPrice })
    if(newProduct){
        return res.status(201).json({message: "new product created"})
    }
    else{
        return res.status(400).json({message: "invalid product"})
    }

}

const updateProduct=async(req,res)=>{
    const {id} = req.params
    const {productName,price,description,kategory,inventory,unitType,originalPrice }= req.body
    if(!id){
        return res.status(400).json({message:'id,productName price, are required'})
    }
    const product=await Product.findById(id)
    if(!product){
        return res.status(400).json({message:'product not found'})   
    }

    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (kategory !== undefined) product.kategory = kategory;
    if (inventory !== undefined) product.inventory = inventory;
    if (unitType !== undefined) product.unitType = unitType;
   if (unitType) {
  product.unitType = unitType;
}
if (originalPrice !== undefined) {
    product.originalPrice = originalPrice;
}
 
    if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
}

    const updatedProduct=await product.save()
    res.json(`${updatedProduct.productName} updated`)
}

const deleteProduct=("/:id",async(req,res)=>{
    const {id}=req.params
    const product=await Product.findById(id)
    if(!product){
        return res.status(400).json({message:'product not found'})
    }
    const name=product.productName
    const result =await product.deleteOne()
    res.json(`${name} deleted`)
})

const updateStock = async (req, res) => {
    const { items } = req.body
    
    try {
        for (const item of items) {
            const product = await Product.findById(item._id)
            if (!product) {
                return res.status(404).json({ message: `Product ${item.productName} not found` })
            }
            
            if (product.inventory < item.quantity) {
                return res.status(400).json({ 
                    message: `Not enough stock for ${item.productName}. Available: ${product.inventory}, Requested: ${item.quantity}` 
                })
            }
            
            product.inventory -= item.quantity
            await product.save()
        }
        
        res.json({ message: 'Stock updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error updating stock', error: error.message })
    }
}

const searchProducts= async (req, res) => {
    try{
    const q=req.query.q||""
const products=await Product.find({
    //$regex-מכיל את q
    //$options-משווה אותיות קטנות גדולות
productName:{$regex:q,$options:"i"}
}).lean()
   res.json({
      products,
      count: products.length
    });
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

module.exports={getAllProducts,createNewProduct,getProductById,updateProduct,deleteProduct,updateStock,searchProducts}
