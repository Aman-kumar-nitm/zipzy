import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import NewsLetter from '../Component/NewsLetter'
import { toast } from 'react-toastify'
import axios from 'axios'
const Login = () => {

  const {navigate,token ,setToken,backendUrl}=useContext(ShopContext)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    try {
      const response=await axios.post(backendUrl+'/api/user/login',{email,password});
      // console.log(response.data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem('token',response.data.token);
        //redirect user to the home page
        // navigate('/')
      }else{
        toast.error("unable to login please check credentials")
      }
    } catch (error) {
      toast.error('err of type 2')
    }
    
   
      }
       useEffect(()=>{
      if(token){
        navigate('/')
      }
    },[token])
  return (
    <>
    {/* <div className='my-15 md:w-1/2 lg:w-1/3 w-full flex flex-col gap-4 mx-auto '>
      <div className="text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center gap-4">
        <h1 className='text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center'>Login</h1>
        <div className="w-8 h-1 bg-gray-400"></div>
      </div>
    <input type="Email" className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Email'/>
    <input type="Password"  placeholder='Password' className='border border-gray-200 p-2 rounded w-full outline-none' />

    <div className="flex justify-between font-light text-sm text-gray-500">
      <p>Forgot your Password?</p>
      <p>Create account</p>
    </div>
<div className="flex justify-center">
  <button type="button" className='bg-black text-white px-4 py-2 w-25 cursor-pointer rounded-sm' onClick={()=>{navigate('/signUp')}}>Sign in</button>
</div>
    

      </div> */}

      

      <form className='my-15 md:w-1/2 lg:w-1/3 w-full flex flex-col gap-4 mx-auto ' onSubmit={(e)=>{onSubmitHandler(e)}}>
         <div className="text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center gap-4">
        <h1 className='text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center'>Login</h1>
        <div className="w-8 h-1 bg-gray-400"></div>
      </div>


 <input type="Email" onChange={(e)=>{setEmail(e.target.value)}}className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Email' value={email} required/>
    <input type="Password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='border border-gray-200 p-2 rounded w-full outline-none' value={password} required/>

    <div className="flex justify-between font-light text-sm text-gray-500">
      <p>Forgot your Password?</p>
      <p onClick={()=>{navigate('/signUp')}} className='cursor-pointer'>Create account</p>
    </div>
  <button type="submit" className='bg-black text-white px-4 py-2 w-25 cursor-pointer rounded-sm mx-auto' >Sign in</button>

      </form>

      <div className="w-full justify-center my-50">
<NewsLetter/>
      </div>
      </>
  )
}

export default Login
