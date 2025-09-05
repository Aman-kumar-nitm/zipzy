import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets_/frontend_assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const {search,setSearch,showSearch,setShowSearch}=useContext(ShopContext)
    // now my goal is to show search bar only on collection page
    const [visibleEle,setVisible]=useState(false);
    const location=useLocation();
    useEffect(()=>{
        // console.log(location.pathname)
        if(location.pathname.includes('collection')&&showSearch){
            setVisible(true);
        }else{
            setVisible(false);
        }
        
    },[location,showSearch])
  return visibleEle?(
    <div className=' bg-gray-50 text-center flex justify-center items-center gap-2 outline-none py-4'>
      <div className="flex my-2 border border-gray-300 rounded-2xl w-2/3 lg:w-[50%] justify-between px-5 items-center py-2">
        <input type="text" className='text-sm  text-gray-500 font-light w-[80%] outline-none' placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <img src={assets.search_icon} alt='search_icon' className='w-4 h-4 '/>
      </div>
      <img src={assets.cross_icon} alt='cross_icon' className='w-3 h-3 cursor-pointer' onClick={()=>setShowSearch(false)}/>
    </div>
  ):''
}

export default SearchBar
