const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const {Stripe}=require("stripe")
const Razorpay=require('razorpay')
//initialize gateway
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_SECRET_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
//placing order using cod
const placeOrder=async(req,res)=>{
try {
    const {userId,items,amount,address}=req.body;
    console.log(items);
    const orderData={
        userId,amount,items,address,paymentMethod:"COD",payment:false,date:Date.now()
    }
    await OrderModel.create(orderData)
    //after uploading to order clear cartData
    await UserModel.findByIdAndUpdate(userId,{cartData:{}});
    res.json({success:true,msg:"ordered Place"});
} catch (error) {
    res.json({success:false,msg:error.message})
}
}
//placing order using stripe
const placeOrderStripe=async(req,res)=>{

  try {
   
    const { userId,items,amount,address} = req.body;
    const {origin}=req.headers;
     const orderData={
        userId,amount,items,address,paymentMethod:"stripe",payment:false,date:Date.now()
    }
    const newOrder=await OrderModel.create(orderData);
    const line_items=items.map((item)=>({
        price_data:{
            currency:'usd',
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100,
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:'usd',
            product_data:{
                name:'delivery charges',
            },
            unit_amount:1*100,
            // assuming one dollar charge on shipping fee
        },
        quantity:1,
    })

    const session=await stripe.checkout.sessions.create({
        success_url:   `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode:'payment'
    })

    res.json({success:true,session_url:session.url})

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//verify Stripe
const verifyStripe=async(req,res)=>{
const {orderId,success,userId}=req.body;
console.log(success);
try {
    if(success==='true'){
        await OrderModel.findByIdAndUpdate(orderId,{payment:true});
        //clear cart Data
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true});
    }else{
        //delete that product
        await OrderModel.findByIdAndDelete(orderId);
        res.json({success:false})
    }
} catch (error) {
     res.json({success:false})
}
}
//placing order using razorpay
const placeOrderRazorpay=async(req,res)=>{
try {
    const { userId,items,amount,address} = req.body;
    return res.json({success:true,msg:'future support currently unavilable'})
     const orderData={
        userId,amount,items,address,paymentMethod:"Razorpay",payment:false,date:Date.now()
    }
    const newOrder=await OrderModel.create(orderData);

    const options={
        amount:amount*100,
        currency:'INR',
        receipt:newOrder._id.toString(),

    }

    const order=await razorpayInstance.orders.create(options);
 res.json({
    success: true,
    order,
    orderId: newOrder._id,
  });


} catch (error) {
   
      res.json({success:false,msg:'not getting how to pay'})
}
}
//data for admin panel
const allOrders=async(req,res)=>{
try {
    //since here if we comes we are already authorized as a admin
    const allOrders=await OrderModel.find({});
    res.json({success:true,allOrders})
} catch (error) {
    res.json({success:false,msg:'internal server error of type 6'})
}
}
//user order Data for front end
const userOrder=async(req,res)=>{
    try {
        const {userId}=req.body;
        const orderData=await OrderModel.find({userId});
        // console.log(orderData);
   
            res.json({success:true,orderData})
        
      


    } catch (error) {
        res.json({success:false,msg:error.message})
    }
}
//update order status from admin panel
const updateStatus=async(req,res)=>{
try {
    //here we will get admin verified
    const {orderId,status}=req.body;
    await OrderModel.findByIdAndUpdate(orderId,{status});
    res.json({success:true,msg:'successfully updated'})

} catch (error) {
    res.json({success:false,msg:'internal server error 8'})
}
}
module.exports={placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrder,updateStatus,verifyStripe}