const express=require('express')
const {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrder,updateStatus,verifyStripe}=require('../controller/orderController');
const adminAuth = require('../middleware/adminauth');
const { authUser } = require('../middleware/auth');

const orderRouter=express.Router();
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/userOrders',authUser,userOrder)
orderRouter.post('/place',authUser,  placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

module.exports=orderRouter;