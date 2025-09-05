import React from 'react'
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
const OurPolicy = () => {
  return (
    <div className="lg:flex  lg:justify-around mt-10 gap-4">
        <div className="flex flex-col items-center justify-center mt-10">
            <RiExchangeDollarLine className='h-[30px] w-[30px] mb-4'/>
            <p className='font-bold text-sm '>Easy Exchange Policy</p>
            <p className='text-sm text-gray-500'>We Offer hassle free exchange policy</p>
        </div>
       <div className="flex flex-col items-center justify-center mt-10">
        <MdVerified className='h-[30px] w-[30px] mb-4'/>
        <p className='font-bold text-sm '>7 Days Return Policy</p>
        <p className='text-sm text-gray-500'>We Provide Return Policy</p>
        </div>
          <div className="flex flex-col items-center justify-center mt-10">
        <RiCustomerService2Fill className='h-[30px] w-[30px] mb-4'/>
        <p className='font-bold text-sm '>Best Customer Support</p>
        <p className='text-sm text-gray-500 '>We Provide 24/7 Support</p>
        </div>
    </div>
  )
}

export default OurPolicy
