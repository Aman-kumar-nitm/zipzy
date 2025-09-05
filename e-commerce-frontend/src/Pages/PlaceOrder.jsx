import React, { useContext, useEffect, useState } from 'react'
import Title from '../Component/Title'
import CartTotal from '../Component/CartTotal'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const {getCartAmount,shippingFee,navigate,backendUrl,token,cartItems,setCartItems,products}=useContext(ShopContext);
  const [paymentMethod,setPaymentMethod]=useState('COD');
  const [formData,setFormData]=useState({
    firstName:'',lastName:'',email:'',street:'',city:'',state:'',zipcode:'',country:'',phone:''
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setFormData(data=>({...data,[name]:value}));
  }

  const HandleSubmit=async(e)=>{
    e.preventDefault();
    try {
      //send the data to the database
      // console.log("cartItems")
      // console.log(cartItems);
      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items));
            if(itemInfo){
              itemInfo.size=item;
              itemInfo.quantity=cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log("yes")
      console.log(orderItems);

      let orderData={
        address:formData,
        items:orderItems,
        amount:getCartAmount()+shippingFee,

      }


      switch(paymentMethod){
        case 'COD':
        const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}});
        console.log(response);
      if(response.data.success){
        setCartItems({});
        navigate('/order')
        toast.success('successfully placed order');
      }else{
        toast.error('you are not authorized')
      }

        break;
      case 'Stripe':
       
        const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}});
      if(responseStripe.data.success){
        console.log('yes yes');
        const {session_url}=responseStripe.data;
        console.log(session_url)
        window.location.replace(session_url)
      }else{
        toast.error(responseStripe.data.msg);
      }
        break;
      case 'RazorPay':
       
      const responseRazorpay=await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}});
      
    
      if(responseRazorpay.data.success){
        // console.log('yes yes');
        // console.log(responseRazorpay.data.order)
        toast.success(responseRazorpay.data.msg)
      }else{
        toast.error('unsuccessful transition');
      }
        break;
        default:
          break;
      }
      
    } catch (error) {
      toast.error('unable to process place order')
    }
  }

  useEffect(()=>{
    console.log(paymentMethod);
  },[paymentMethod])
  return (
    <form onSubmit={(e)=>HandleSubmit(e)} className='my-10 md:flex gap-25 flex flex-col md:flex-row'>
      <div className="w-full md:w-1/2">
      <Title title1='DELIVERY' title2='INFORMATION'/>
     
       
      <div className="flex flex-col gap-4">
         <div className="flex  gap-2">
         <input type="text" required onChange={onChangeHandler} name='firstName' value={formData.firstName} placeholder='First Name' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2 '/>
      <input type="text"  required onChange={onChangeHandler} name='lastName' value={formData.lastName} placeholder='Last Name' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2'/>
      </div>
        <input type="email"  required onChange={onChangeHandler} name='email' value={formData.email} placeholder='Email address' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-full' />   

      <input type="text"  required onChange={onChangeHandler} name='street' value={formData.street} placeholder='Street' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-full'/>

      <div className="flex gap-2">
        <input type="text"  required placeholder='City' onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2'/>      
      <input type="text"  required onChange={onChangeHandler} name='state' value={formData.state} placeholder='State' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2'/> </div>      
      
      <div className="flex gap-2">
      <input type="text"  required onChange={onChangeHandler} name='zipcode' value={formData.zipcode}  placeholder='Zip code' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2'/>   
      <input type="text"  required onChange={onChangeHandler} name='country' value={formData.country} placeholder='Country' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-1/2'/>   
      </div>
      
      <input type="tel"  required onChange={onChangeHandler} name='phone' value={formData.phone} placeholder='Phone' className='border border-gray-125 outline-none p-2 text-sm font-light rounded-sm text-gray-400 w-full'/>
      </div>
      
      

      
        

      </div>
      <div className="w-full md:w-1/2">
        <Title title1={'CART'} title2={'TOTALS'}/>
        <div className="flex justify-between border-t border-gray-200 py-3 ">
            <p>Subtotal</p>
            <p>${getCartAmount()}.00</p>
        </div>
        <div className="flex justify-between border-t border-gray-200 py-3">
            <p>Shipping Fee</p>
            <p>${shippingFee}.00</p>
        </div>
        <div className="flex justify-between border-t border-gray-200 py-3">
            <p>Total</p>
            <p>${getCartAmount()===0?0:getCartAmount()+shippingFee}</p>
        </div>
        
          <Title title1='PAYMENT' title2='METHOD'/>
        <div className="flex justify-between">
             <label className="flex items-center space-x-2 cursor-pointer" onClick={(e)=>setPaymentMethod('Stripe')}>
              {/* same name so that we cannot select more than one */}
        <input
          type="radio"
          name="payment"
          value="Stripe"
        
          
        
        />
        <span className="font-semibold text-blue-500" onClick={(e)=>setPaymentMethod('Stripe')}>Stripe</span>
      </label>

      <label className="flex items-center space-x-2 cursor-pointer" onClick={(e)=>setPaymentMethod('RazorPay')}>
        <input
          type="radio"
          name="payment"
          value="RazorPay"
         
        
        />
        <span className="font-semibold text-green-500" onClick={(e)=>setPaymentMethod('RazorPay')}>RazorPay</span>
      </label>

      <label className="flex items-center space-x-2 cursor-pointer" onClick={(e)=>setPaymentMethod('COD')}>
        <input
          type="radio"
          name="payment"
          value="COD"
          
          
        
        />
        <span className="font-semibold text-orange-500 " onClick={(e)=>setPaymentMethod('COD')}>Cash on Delivery</span>
      </label>
        </div>
        <button type="submit" className='px-4 py-2 bg-black rounded-sm text-white text-sm font-semibold cursor-pointer text-center mx-auto block my-10' onClick={()=>navigate('/order')}>Place Order</button>

      </div>
      
    </form>
  )
}

export default PlaceOrder
