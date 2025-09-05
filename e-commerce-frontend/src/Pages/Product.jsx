import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets_/frontend_assets/assets';
import Title from '../Component/Title';
import RelateProducts from '../Component/RelateProducts';
const Product = () => {
const {products,addToCart}=useContext(ShopContext)
  const {productId}=useParams();
  // productId should match with route format productId
  // console.log(productId)
  const [productData,setProductData]=useState(false)
  const [firstImage,setFirstImage]=useState('');
const[size,setSize]=useState('');

  
  const fetchProductData=async ()=>{
    
    const product=await products.find((item)=>item._id===productId);
    setProductData(product);
   
    setFirstImage(product.image[0]);
  }
  
  useEffect(()=>{
    fetchProductData();
  },[productId])
  
  return productData?(
    <div className="mt-10">

      <div className="w-full grid md:grid-cols-2 gap-4 ">
        <div className="grid grid-cols-[1fr_3fr] gap-2 items-start">
         
            <div className="flex flex-col overflow-y-scroll gap-2 ">

            {
              productData.image.map((item,index)=>{
                  return <img onClick={()=>{setFirstImage(item)}} key={index} src={item} alt='pdt_image' className='w-full h-[24%]  object-contain cursor-pointer flex-shrink-0'/>
              })
            }
          </div>
          
          
          <div className=" overflow-hidden ">
            <img src={firstImage} alt='pdt_image' className='w-full h-full object-contain transition-transform duration-300 hover:scale-110 cursor-pointer'/>
          </div>
          
      </div>
      {/* right-container */}
      <div className="w-full mt-10 sm:mt-0 ">
        <div className="flex flex-col gap-5 justify-center">
        
        <div className="flex flex-col gap-1">
          <h2 className='font-semibold text-3xl text-gray-500'>{productData.name}</h2>
          <div className="flex gap-2">
            <img src={assets.star_icon} alt="balaji" className='w-3 h-5'/> <img src={assets.star_icon} alt="balaji" className='w-3 h-5'/> <img src={assets.star_icon} alt="balaji" className='w-3 h-5'/> <img src={assets.star_icon} alt="balaji" className='w-3 h-5'/> <img src={assets.star_dull_icon} alt="balaji" className='w-3 h-5'/>

            <p className='pl-3 text-sm text-gray-700'>(122)</p>
          </div>
        </div>
        <p className='font-bold text-3xl'>${productData.price}</p>
        <p className='font-light text-gray-400 text-sm'>{productData.description}</p>

      </div>
      <div className="flex flex-col gap-8 my-5">
        <p className='font-medium text-gray-600'>Select Size</p>
        <div className="flex gap-2 items-start">
          {/* size list */}
          {
            productData.sizes.map((item,index)=>{
              return <button onClick={()=>setSize(item)} className={`flex justify-center items-center h-[50px] w-[50px]  bg-gray-100 border ${item===size?'border-orange-500':''} cursor-pointer`}  key={index}>{item}</button>
            })
          }
        </div>
        <button type="button" onClick={()=>{addToCart(productData._id,size)}}  className='text-center bg-black text-white font-light py-3 px-6 w-1/3 cursor-pointer'>Add to Cart</button>
        <div className="text-gray-800 font-light text-sm border-t pt-8">
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
      </div>
      </div>
      
      


      </div>
     
      {/* description section */}
          <div className="my-10">
            <div className="flex border-gray-400 gap-4 bg-gray-100 py-3 px-2 w-[260px]">
              <b className='font-semibold text-gray-700  w-1/2'>Description</b>
              <p className='font-semibold text-gray-500 bg-gray-100  w-1/2'>Reviews(122)</p>
            </div>
              <div className="border border-gray-200 px-6 py-10 leading-tight">
                <p className='text-sm font-light text-gray-600 p-2'> E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                  E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                </p>
                <p className='text-sm font-light text-gray-600 p-2'>  It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
              </div>
          </div>

          
          
            {/* related pdt */}

            <RelateProducts category={productData.category} subcategory={productData.subCategory} />
          

    </div>
  ):''
}

export default Product
