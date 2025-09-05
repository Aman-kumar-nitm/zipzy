import React, { useContext, useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios'
import { toast } from 'react-toastify';
const Login = ({setToken}) => {

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
  const onSubmitHandler=async (e)=>{
    try {
        e.preventDefault();
        // console.log(email,password);
        const response=await axios.post(backendUrl+'/api/user/adminLogin',{email,password});
        // console.log(response);
        // console.log(response.data);
        if(response.data.success===true){
            setToken(response.data.token);
        }else{
            toast.error('response.data.msg')
        }

    } catch (error) {
        console.log(error);
        toast.error('error.message')
    }
    
      }
  return (
    <div className='flex justify-center items-center sm:p-10'>
      <form className='my-15 md:w-[40%] lg:w-1/3 w-full flex flex-col gap-4 md:mx-auto mx-10' onSubmit={onSubmitHandler} >
         <div className="text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center gap-4">
        <h1 className='text-2xl font-bold text-gray-400 prata-regular flex justify-center items-center'>Login</h1>
        <div className="w-8 h-1 bg-gray-400"></div>
      </div>
     <input onChange={(e)=>{setEmail(e.target.value)}} type="Email" className='border border-gray-200 p-2 rounded w-full outline-none'  placeholder='Email' required/>
    <input onChange={(e)=>{setPassword(e.target.value)}} type="Password"  placeholder='Password' className='border border-gray-200 p-2 rounded w-full outline-none' required/>

    <div className="flex justify-between font-light text-sm text-gray-500">
      <p>Forgot your Password?</p>
      <p onClick={()=>{setSign(false)}} className='cursor-pointer'>Create account</p>
    </div>
  <button type="submit" className='bg-black text-white px-4 py-2 w-25 cursor-pointer rounded-sm mx-auto' onSubmit={onSubmitHandler}>Sign in</button>

      </form>

     
      </div>
  
  )
}

export default Login
