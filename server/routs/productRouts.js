const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")
const upload = require("../middleware/uploads")

router.get("/getAll", productController.getAllProducts);
//router.get("/:id", productController.getProductById);
router.put("/updateStock", productController.updateStock)
 router.post("/", upload.single("image"), productController.createNewProduct)
 router.delete("/:id",productController.deleteProduct)
router.put("/:id", (req, res, next) => {
    upload.single("image")(req, res, err => {
        if(err) return next(err)
        next()
    })
}, productController.updateProduct)
router.get("/search",productController.searchProducts)

module.exports=router