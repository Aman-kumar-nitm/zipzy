import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
const Sidebar = () => {
  return (
   <div className=" w-[100%]  border-r-2 border-gray-400 min-h-[80vh]">
    <div className="flex flex-col gap-2 ">
        <NavLink to='/add' className='flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
        <img src={assets.add_icon} alt="addItems" className='w-5 h-5'/>
        <p className='hidden md:block text-sm text-gray-400 font-medium'>Add Items</p>
        </NavLink>
        <NavLink to='/orders' className='flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
        <img src={assets.order_icon} alt="addItems" className='w-5 h-5'/>
        <p className='hidden md:block text-sm text-gray-400 font-medium'>Orders</p>
        </NavLink>
        <NavLink to='/list' className='flex item-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1'>
        <img src={assets.parcel_icon} alt="addItems" className='w-5 h-5'/>
        <p className='hidden md:block text-sm text-gray-400 font-medium'>List Items</p>
        </NavLink>
      </div>
   
   </div>
      
  )
}

export default Sidebar
