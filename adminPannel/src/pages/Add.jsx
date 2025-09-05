import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import axios from 'axios'
const Add = ({token}) => {
  const allSizes = ["S", "M", "L", "XL", "XXL"];
  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);
  const [name,setName]=useState('');
  const [description,setDescription]=useState('')
  const [price,setPrice]=useState(0);
  const [category,setCategory]=useState('Men')
  const [subCategory,setSubCategory]=useState('Topwear')
  const [bestSeller,setBestSeller]=useState(false);
  const [sizes,setSizes]=useState([])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      
      // const response=await axios.post(backendUrl+'/api/product/add',{image1,image2,image3,image4,name,description,price,category,subCategory,bestSeller,sizes});
     const formData = new FormData();
formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("category", category);
formData.append("subCategory", subCategory);
// formData.append("bestSeller", bestSeller); // true/false
formData.append("bestSeller", bestSeller ? "true" : "false");

formData.append("sizes", JSON.stringify(sizes)); // array → stringify it

// Append images (assuming they are File objects)
image1&&formData.append("image1", image1);
image2&&formData.append("image2", image2);
image3&&formData.append("image3", image3);
image4&&formData.append("image4", image4);
//      for (let [key, value] of formData.entries()) {
//   console.log(key, value);
// }
console.log(token);
     const response= await axios.post(backendUrl+'/api/product/add',formData,{headers:{token}});
    //  console.log(response);
    if(response.data.success===true){
      toast.success('Product added')
      setName('')
      setDescription('')
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
      setPrice('')

    }
    else{
      toast.error(response.data.msg)
    }
    } catch (error) {
      toast.error('Something went Wrong')
    }
  }
// useEffect(()=>{
// console.log(image1,image2,image3,image4,name,description,sizes,bestSeller)
// },[image1,image2,image3,image4,name,description,sizes,bestSeller])
const handleSizes=async(s)=>{
  if(sizes.includes(s)){
    //if already exist and again pressed then remove it
    setSizes(sizes.filter((item)=>item!==s))
  }else{
    setSizes([...sizes,s])
  }
}
  return (
    <div className='w-full'>
      <form className='flex flex-col gap-3' onSubmit={(e)=>handleSubmit(e)}>

        <p className='text-xl font-semibold text-gray-500 mb-2'>Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
          <img className='w-20 h-20 object-contain' src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="upload_img" />
          <input type="file"  id="image1" hidden onChange={(e)=>{setImage1(e.target.files[0])}}/>
        </label>
        <label htmlFor="image2">
          <img className='w-20 h-20 object-contain' src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="upload_img" />
          <input type="file"  id="image2" hidden onChange={(e)=>{setImage2(e.target.files[0])}}/>
        </label>
        <label htmlFor="image3">
          <img className='w-20 h-20 object-contain' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="upload_img" />
          <input type="file"  id="image3" hidden onChange={(e)=>{setImage3(e.target.files[0])}}/>
        </label>
        <label htmlFor="image4">
          <img className='w-20 h-20 object-contain' src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="upload_img" />
          <input type="file"  id="image4" hidden onChange={(e)=>{setImage4(e.target.files[0])}}/>
        </label>
        </div>
        <div >
          <p className='mb-2 text-gray-500 font-light text-md'>Product Name</p>
          <input className='w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-0 rounded-sm' type="text" placeholder='Product Name' required onChange={(e)=>{setName(e.target.value)}} value={name}/>
        </div>
       <div> <p className='mb-2 text-gray-500 font-light text-md'>Product description</p>
          <textarea className='w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-0 rounded-sm' type="text" placeholder='Product description' required onChange={(e)=>{setDescription(e.target.value)}} value={description}/></div>
         <div ><p className='mb-2 text-gray-500 font-light text-md'>Product category</p>
          <select className='w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-0 rounded-sm' onChange={(e)=>{setCategory(e.target.value)}}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select></div> 
          <div >  
          <p className='mb-2 text-gray-500 font-light text-md'>Product Subcategory</p>
          <select className='w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-0 rounded-sm' onChange={(e)=>{setSubCategory(e.target.value)}}>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select></div>
        <div><p className='mb-2 text-gray-500 font-light text-md'>Product Price</p>
        <input type="Number" value={price} placeholder='25' onChange={(e)=>{setPrice(e.target.value)}} className='w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-0 rounded-sm'/></div>
        
         
      <div ><p className='mb-2 text-gray-500 font-light text-md'>Select Size</p>
      <div className="flex gap-4">
        {allSizes.map((s,index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="size"
              value={s}
              checked={sizes.includes(s)}
              onChange={()=>{handleSizes(s)}}
              
            />
            {s}
          </label>
        ))}
      </div></div>  
      
      <div ><label  className="flex items-center gap-2 cursor-pointer">
           BestSeller
            <input
              type="checkbox"
              name="size"
             
             checked={bestSeller}
              onChange={()=>{setBestSeller(!bestSeller)}}
              />
             
            </label>
        </div>
         

        <button type='submit' className=' w-30 md:w-50 mx-auto px-auto py-3 bg-amber-500 rounded-md cursor-pointer' >Add</button>
      </form>
    </div>
  )
}

export default Add
