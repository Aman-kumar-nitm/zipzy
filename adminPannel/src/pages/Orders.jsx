import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets';
const Orders = ({token}) => {
  const [orders,setOrders]=useState([]);
  const fetchAllOrders=async()=>{
    if(!token){
      return null;
    }

    const response=await axios.post(backendUrl+'/api/order/list',{},{headers:{token}});
    console.log(response);
    if(response.data.success){
      setOrders(response.data.allOrders);

    }else{
      toast.error('unable to fetch orders')
    }

    console.log(orders);
  }
  const statusHandler=async(event,orderId)=>{
    try {
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token}});
      if(response.data.success){
        toast.success('successfully updated');
      }else{
        toast.error('unable to update')
      }
    } catch (error) {
      toast.error('internal server error 9')
    }
  }
  useEffect(()=>{
    fetchAllOrders();
  },[token])
  
  return (
    <div>
      <h2 className='font-medium text-gray-700'>Orders Page</h2>
      <div className="flex flex-col gap-5">
        {
          orders.map((order,index)=>{
            return <div className="border border-amber-700 bg-white grid md:grid-cols-[1fr_1fr] lg:grid-cols-[3fr_2fr_2fr_1fr] justify-center my-5 p-5 items-center gap-4" key={index}>
              
              <div className="">
                <img src={assets.parcel_icon} alt="parcel Img" />
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return <p key={index}>{item.name}x{item.quantity}<span>{item.size}</span></p>
                  }else{
                    return <p key={index}>{item.name}x{item.quantity}<span>{item.size},</span></p>
                  }
                })}
              </div>
              

              <div className="flex-col gap-1 text-gray-700">
                <p className='font-bold'>Name:{order.address.firstName+''+order.address.lastName}</p>
                <p>{order.address.street+','}</p>
                <p>{order.address.city+','+order.address.state+','+order.address.country+','+order.address.zipcode}</p>
                <p>Phone:{order.address.phone}</p>
              </div>
              <div className="flex-col gap-1 text-gray-700 ">
                <p>Items:{order.items.length}</p>
                <p>Method:{order.paymentMethod==='COD'?'cash on delivery':order.paymentMethod}</p>
                <p>Payment:{order.payment?'Done':'Pending'}</p>
                 <p>amount:${order.amount}</p>
                <p>Date:{new Date(order.date).toLocaleDateString()}</p>
              </div>

             

              <select onChange={(e)=>{statusHandler(e,order._id)}} className='outline:none border border-gray-200 p-2 font-light text-gray-500' value={order.status}>
                <option value="Order Placed">Order placed</option>
                <option value="Packing">Packing</option>
                <option value="Shift">Shift</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Deliverd">Deliverd</option>
              </select>
            </div>
           
            
          })
        }
      </div>

    </div>
  )
}

export default Orders
