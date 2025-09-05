import React, { useContext,useEffect,useState } from 'react'
import Title from '../Component/Title'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const {backendUrl,token,currency}=useContext(ShopContext)
  const [orderData,setOrderData]=useState([]);

const loadOrderData=async()=>{
  try {
    if(!token){
      return null;
    }
    const response=await axios.post(backendUrl+'/api/order/userOrders',{},{headers:{token}});
    console.log(response.data);
    if(response.data.success){
// setOrderData(response.data.orderData)
let allOrderItems=[];
response.data.orderData.map((order)=>{
  order.items.map((item)=>{
    item['status']=order.status;
    item['payment']=order.payment;
    item['paymentMethod']=order.paymentMethod;
    item['date']=order.date;
    allOrderItems.push(item);
  })
})

setOrderData(allOrderItems.reverse());
// reverse is for new data at top
    }else{
      toast.error(error.msg)
    }
    
  } catch (error) {
    toast.error('unable to fetch ordered Data')
  }
}
useEffect(()=>{
  loadOrderData()
},[token])
  return (
    <div className='my-10'>
      <Title title1='MY' title2='ORDERS'/>
      <div className="flex flex-col gap-6">
        {/* for now just show 4 products */}
        {orderData.map((item,index)=>{
          return <div className="flex flex-col justify-between border-t border-gray-100 pt-4 gap-5 items-center md:flex-row md:gap-0" key={index} >
            <div className="flex gap-8 item-center w-full md:w-1/3">
              <img src={item?.image[0]} alt='PdtImg' className='h-25 '/>
              <div className="flex flex-col gap-2 justify-center">
                <h3 className='font-semibold text-gray-500'>{item.name}</h3>
                <div className="flex gap-2 text-gray-500 font-medium">
                  <p>{currency}{item.price}</p>
                  <p>Quantity:{item.quantity}</p>
                  <p>Size:{item.size}</p>
                </div>
                <p  className="flex gap-2 text-gray-500 font-medium">Date:<span>{new Date(item.date).toDateString()}</span></p>
                <p  className="flex gap-2 text-gray-500 font-medium">Payment:<span>{item.paymentMethod==='COD'?'cash on Delivery':item.paymentMethod}</span></p>
              </div>
            </div>

            <p>🚚 {item.status}</p>
            <button onClick={loadOrderData} type="button" className='font-light text-gray-400 border border-gray-300 p-2 h-10 rounded-sm cursor-pointer  transition duration-300 ease-in-out 
        hover:text-blue-300'>Track Order</button>
          </div>
        })}
      </div>
      
    </div>
  )
}

export default Orders
