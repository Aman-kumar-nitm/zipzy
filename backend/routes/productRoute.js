const express=require('express')
const upload=require('../middleware/multer')
const productRoute=express.Router();
const {listProducts,addProduct,removeProduct,singleProduct} =require('../controller/productController')
const adminAuth=require('../middleware/adminauth')
productRoute.delete('/remove/:id',adminAuth,removeProduct)
productRoute.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
productRoute.get('/single/:id',singleProduct)
productRoute.get('/list',listProducts)

module.exports=productRoute;