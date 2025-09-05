const express=require('express')

const cors=require('cors');


require('express-async-errors')
require('dotenv').config();


const app=express();
const connectDB=require('./db/connectDB')
const connectCloudinary=require('./cloudinary/cloudinary')
const notFound=require('./middleware/notFound')
const errorHandler=require('./middleware/errorHandler')

app.use(express.json());

app.use(cors())
//routers
const authRouter=require('./routes/authRouter')
const productRoute=require('./routes/productRoute')
const cartRouter=require('./routes/cartRoute')
const orderRouter=require('./routes/orderRoute')
app.use('/api/user',authRouter);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.get('/',(req,res)=>{
    res.send('hello aman ')
})






app.use(notFound)
app.use(errorHandler)




const start=async()=>{
    try {
        const port=process.env.PORT||3000;
        await connectDB(process.env.MONGO_URI);
        await connectCloudinary();
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(`unable to connectDB`)
    }
}
start();