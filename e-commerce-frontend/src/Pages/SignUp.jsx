import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import NewsLetter from '../Component/NewsLetter'
import axios from 'axios'
import { toast } from 'react-toastify'
const SignUp = () => {

  const {navigate,token,setToken,backendUrl}=useContext(ShopContext)
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(name,email,password);
    try {
      const response=await axios.post(backendUrl+'/api/user/signup',{name,email,password});
      if(response.data.success){
        localStorage.setItem('token',response.data.token)
        setToken(localStorage.getItem('token'))
        toast.success('successfully register')
      }else{
        toast.error(response.data.msg)
      }
      
    } catch (error) {
      toast.error('internal server err of type 3')
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <>
    {/* <div className='my-15 md:w-1/2 lg:w-1/3 w-full flex flex-col gap-4'>
      <div className="text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center gap-4">
        <h1 className='text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center'>SignUp</h1>
        <div className="w-8 h-1 bg-gray-400"></div>
      </div>

      <input type="text" className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Name'/>
    <input type="Email" className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Email'/>
    <input type="Password"  placeholder='Password' className='border border-gray-200 p-2 rounded w-full outline-none' />

    
<div className="flex justify-center">
  <button type="button" className='bg-black text-white px-4 py-2 w-25 cursor-pointer' >Create</button>
</div>
     */}

    

      {/* </div> */}


      <form onSubmit={(e)=>{handleSubmit(e)}} className='my-15 md:w-1/2 lg:w-1/3 w-full flex flex-col gap-4 mx-auto'>
      <div className="text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center gap-4">
        <h1 className='text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center'>SignUp</h1>
        <div className="w-8 h-1 bg-gray-400"></div>
      </div>

      <input onChange={(e)=>{setName(e.target.value)}} type="text" className='border border-gray-200 p-2 rounded w-full outline-none' value={name} placeholder='Name' required/>
    <input type="Email" onChange={(e)=>{setEmail(e.target.value)}} className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Email' value={email} required/>
    <input type="Password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='border border-gray-200 p-2 rounded w-full outline-none' value={password} required/>

    <p className='text-gray-500 font-light cursor-pointer' onClick={()=>{navigate('/login')}}>already have an account Sign in</p>
<button type="submit" className='bg-black text-white px-4 py-2 w-25 cursor-pointer mx-auto' >Create</button>
      </form>

      <div className="w-full justify-center my-50">
<NewsLetter/>
      </div>
</>
  )
}

export default SignUp
