import React from 'react'
import { assets } from '../assets_/frontend_assets/assets'
const Hero = () => {
  return (
    <div className='  flex flex-col sm:flex-row border border-gray-400 mt-1.5 '>
      {/* hero left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="flex flex-col py-10">
            <div className="text-[#414141] flex flex-col gap-3">
                <div className="flex items-center gap-5 prata-regular">
             <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-semibold'>Our Bestsellers</p>
                </div>
            <h1 className='prata-regular text-3xl lg:text-5xl'>Latest Arrivals</h1>
             
             <div className="flex items-center gap-5">
             
            <p className='font-semibold'>Shop Now</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
            
        </div>
      </div>

      {/* hero right */}
      <div className="w-full sm:w-1/2 ">
       <img src={assets.hero_img} alt='hero-img'/>
      </div>
    </div>
  )
}

export default Hero
