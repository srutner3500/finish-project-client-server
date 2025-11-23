const Order = require("../models/Order")

const getAllOrders=async(req,res)=>{
  const orders= await Order.find().lean()
  if(!orders){
  return res.status(400).json({message:'no orders found'})
  }
  res.json(orders)
}

const getOrderById=async(req,res)=>{
    const{id}=req.params
    const order=await Order.findById(id).lean()
    if(!order){
        return res.status(404).json({message: "id not exist"})
    }
    else{
        return res.status(201).json(order)
    }
}

const createOrder = async (req, res) => {
        const { name, date, address } = req.body
        if (!name || !date || !address) {
            return res.status(400).json({ message: 'name, date and address are required' })
        }
        const { country, city, street, numHouse } = address
        if (!country || !city || !street || !numHouse) {
            return res.status(400).json({ message: 'All address fields (country, city, street, numHouse) are required' })
        }
        const newOrder = await Order.create({ name, date, address })
        if(newOrder){
            return res.status(201).json({message: "New order created"})
        }
         else{
            return res.status(400).json({ message: "invalid order" })
         }
}


const updateOrder=async(req,res)=>{
    const {_id, name, date, address}= req.body
    if(!_id||!name||!date||!address){
        return res.status(400).json({message:'_id,name, date and address are required'})
    }
    const order=await Order.findById(_id)
    if(!order){
        return res.status(400).json({message:'order not found'})   
    }
    const { country, city, street, numHouse } = address
        if (!country || !city || !street || !numHouse) {
            return res.status(400).json({ message: 'All address fields (country, city, street, numHouse) are required' })
        }
    order.name=name
    order.date=date
    order.address=address
    const updatedOrder=await order.save()
    res.json(`${updatedOrder.name} updated`)
}

const deleteOrders=async (req,res)=>{
    const {id}=req.body
    const order=await Order.findById(id)
    if(!order){
        return res.status(400).json({message:'order not found'})
    }
    const name=order.name
    const result =await order.deleteOne()
    res.json(`${name} deleted`)
}

module.exports={getAllOrders,createOrder,getOrderById,updateOrder,deleteOrders}
