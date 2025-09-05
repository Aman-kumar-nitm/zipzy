import React from 'react'
import { assets } from '../assets_/frontend_assets/assets'
import Title from '../Component/Title'
import NewsLetter from '../Component/NewsLetter'
const Contact = () => {
  return (
    <>
    <div className='my-10'>
      <Title title1='Contact' title2='US'/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10 justify-center mx-auto">
        <img src={assets.contact_img} alt='aboutImg' className='w-2/3 mx-auto'></img>

        <div className="w-full flex flex-col gap-4 text-sm font-light text-gray-600 justify-center md:pr-20 mx-auto">
           <h2 className='font-bold text-xl text-gray-800'>OUR STORE</h2>
           <p>851133 Teghra,
Begusarai, Bihar, India</p>
<p>Tel: (91) 9835‑xxxxx</p>
<p>Email: amankxxarecxxxx@gmail.com</p>
<h2 className='font-bold text-xl text-gray-800'>Careers at Forever</h2>
<p>Learn more about our teams and job openings.</p>
<button type="button" className='py-2 px-4 border border-gray-200 w-40 mx-auto md:mx-0 cursor-pointer'>Explore Jobs</button>
        </div>
       
      </div>
    </div>
    

    <div className="my-25">
      <NewsLetter/>
    </div>
    </>
    
  )
}

export default Contact
