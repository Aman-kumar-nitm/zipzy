import React from 'react'
import {assets} from '../assets/admin_assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='my-5  flex justify-between px-5 py-2 border-b-2 border-gray-800'>
      <img src={assets.logo} alt='navbar-img' className='w-[20%] sm:w-[90px] md:w-[100px] lg:w-[120px]'/>
      <button className='bg-gray-600 text-white py-2 px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer' onClick={()=>{setToken('')}}>Logout</button>
    </div>
  )
}

export default Navbar
