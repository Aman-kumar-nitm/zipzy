import React from 'react'
import LogoImg from '../assets/zippzyLogo.png'
import { NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='my-10'>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={LogoImg} alt='LogoImg' className='w-[150px] h-[100px]'/>
      <p className='text-sm text-gray-600 w-full md:w-2/3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="">
          <h2 className='text-2xl font-bold pb-4'>Company</h2>
          <ul className='flex flex-col gap-1'>
           <li>Home</li>
           <li>About Us</li>
           <li>Delivery</li>
           <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="">
        <h2 className='text-2xl font-bold pb-4'>Get In Touch</h2>
        <ul className='flex flex-col gap-1'>
          <li>+91-99054xxxxx</li>
          <li>amankuXxxecXXXXnitm@gmail.com</li>
        </ul>

        </div>
      </div>
      
      <p className='text-gray-600 font-medium text-sm text-center border-t border-gray-700 pt-4'>Copyright 2025 © amankuXxxecXXXXnitm - All Right Reserved.</p>


    </div>
  )
}

export default Footer
