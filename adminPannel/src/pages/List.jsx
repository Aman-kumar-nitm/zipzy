import axios from 'axios'
import React from 'react'
import { backendUrl } from '../App'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'

const List = ({token}) => {
const [list,setList]=useState([]);
const fetchList=async()=>{
  try {
    const response=await axios.get(backendUrl+'/api/product/list');
    if(response.data.success){
      
      setList(response.data.allProducts)
    }else{
      toast.error('unable to fetch list')
    }
    
  } catch (error) {
    console.log(error);
    toast.error('Internal server error')
  }
}
useEffect(()=>{
  fetchList();
},[])
const removePdt=async(id)=>{
  try {
    console.log(id);
       const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`,{headers:{token}});
       if(response.data.success){
        toast.success('successfully removed data');
        await fetchList();
       }else{
        toast.error(response.data.msg)
       }
      
  } catch (error) {
    toast.error('Unable to delete Product')
  }
}

  return (
    <div>
      <p className='text-gray-500 font-medium text-xl mb-5'>All Product List</p>
      <div className='hidden  md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center w-full bg-gray-300 py-2 px-5 rounded-sm mb-10'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      <div className="flex flex-col gap-2">
        {list.map((item)=>{
            console.log(item);
          return <div className='grid grid-cols-[1fr_1.5fr_1fr_0.5fr_0.5fr] md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center w-full bg-gray-100  rounded-sm border border-gray-200' key={item._id}>
          
            <img src={item.image[0]} alt='item_img' className='w-20 h-20 cursor-pointer'/>
            <p className='text-medium font-medium text-gray-700'>{item.name}</p>
            <p className='text-medium font-medium text-gray-500'>{item.category}</p>
            <p className='text-medium font-medium text-gray-700'>${item.price}</p>
            <img src={assets.parcel_icon} alt='delete_icon' className='w-5 h-5 cursor-pointer' onClick={()=>{removePdt(item._id)}} /> 
          </div>
        })}
      </div>
    </div>
  )
}

export default List
