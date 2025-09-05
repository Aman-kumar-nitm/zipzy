import React from 'react'
import { assets } from '../assets_/frontend_assets/assets'
import Title from '../Component/Title'
import NewsLetter from '../Component/NewsLetter'
const About = () => {
  return (
    <>
    <div className='my-10'>
      <div className="text-center text-2xl">
        <Title title1='About' title2='US'/>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 justify-center mx-auto">
        <img src={assets.about_img} alt='aboutImg' className='w-2/3 mx-auto'></img>

        <div className="w-full flex flex-col gap-4 text-sm font-light text-gray-600 justify-center md:pr-20">
           <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
        <p>
        Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
      <p className='font-bold text-gray-800'>Our Mission</p>
    <p>

      Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
       
      </div>
    </div>
    <div className="my-10">
    <Title title1='WHY' title2='CHOOSE US'/>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 my-10">
      <div className="flex-col justify-center align-center gap-5 border border-gray-200 p-20">
        <p className='font-bold text-gray-600'>Quality Assurance:</p>
        <p className='font-medium text-gray-500 text-sm'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
      </div>
      <div className="flex-col justify-center align-center gap-5 border border-gray-200 p-20">
        <p className='font-bold text-gray-600'>Convenience: </p>
        <p className='font-medium text-gray-500 text-sm'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
      </div>
      <div className="flex-col justify-center align-center gap-5 border border-gray-200 p-20">
        <p className='font-bold text-gray-600'>Exceptional Customer Service:</p>
        <p className='font-medium text-gray-500 text-sm'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
      </div>
    </div>
    </div>

    <div className="my-25">
      <NewsLetter/>
    </div>
    </>
    
  )
}

export default About
