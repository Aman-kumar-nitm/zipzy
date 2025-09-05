import React, { useContext } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogoImg from '../assets/zippzyLogo.png'
import { assets } from '../assets_/frontend_assets/assets';
import { ShopContext } from '../Context/ShopContext';
import { toast } from 'react-toastify';
const Navbar = () => {
  const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)

  const handleLogout=()=>{
    setToken('');
    localStorage.removeItem('token');
     setCartItems({})
    navigate('/login')
   
  }
  return (
    <div className='flex justify-between items-center px-2 pt-2  border-b-[0.1rem] border-gray-300'>
        <Link to='/'>
         <img src={LogoImg} alt='Logo Img' className='h-[70px] w-[100px] md:w-[150px] lg:h-[100px]'/></Link>
     
      <ul className='hidden sm:flex gap-3 md:gap-5 text-gray-600'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>Collection</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>About</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
         <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>Contact</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
      </ul>
    <div className="flex items-center gap-6">
    <IoSearch className='h-5 w-5 cursor-pointer' onClick={()=>{setShowSearch(true)}}/>
    
        <div className="relative group">
  <IoIosContact className="h-5 w-5 cursor-pointer" onClick={()=>token?toast.success('you are already logged in'):navigate('/login')}/>

  {token && <div className="hidden absolute top-5 left-0 bg-white shadow-md p-2 group-hover:block group">
    <a className="block px-2 py-1 hover:text-blue-500 cursor-pointer" onClick={()=>token?toast.success('you are already logged in'):navigate('/login')}>Profile</a>
    <a className="block px-2 py-1 hover:text-blue-500 cursor-pointer" onClick={()=>{navigate('/order')}}>Orders</a>
    <a className="block px-2 py-1 hover:text-blue-500 cursor-pointer" onClick={handleLogout}>Logout</a>
  </div>}
  
</div>

   
    <Link to='/cart' className='relative'>
    <FaShoppingCart className='h-5 w-5'  />
    <p className="h-3 w-3 absolute bottom-[7px] right-[-7px] bg-blue-400 text-white  text-center rounded-full text-[8px]">{getCartCount()}</p>

    </Link>
    

    
    <div className="relative group">
  <img src={assets.menu_icon} alt='menu_icon' className='w-5 h-5 cursor-pointer sm:hidden'/>
  <div className="hidden absolute top-5 left-[-60px] bg-white shadow-md p-2 group-hover:block group">
    <a href='/' className="block px-2 py-1 hover:text-blue-500 cursor-pointer">Home</a>
    <a href='/collection' className="block px-2 py-1 hover:text-blue-500 cursor-pointer">Collection</a>
    <a href='/about' className="block px-2 py-1 hover:text-blue-500 cursor-pointer">About</a>
    <a href='/contact' className="block px-2 py-1 hover:text-blue-500 cursor-pointer">Contact</a>
  </div>
    </div>
    
    </div>
    </div>
  )
}

export default Navbar
