import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'

  import { ToastContainer, toast } from 'react-toastify';
export const backendUrl=import.meta.env.VITE_BACKEND_URL;
const App = () => {

  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  //save it to local storage
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return <div >
    <ToastContainer/>
    {token!==''?(
    <div className='bg-gray-50 mt-5 mx-10'>
      
      <Navbar setToken={setToken}/>
      <div className="grid gap-5 grid-cols-[1fr_5fr]">
        <Sidebar/>
    <Routes>
      <Route path='/add' element={<Add token={token}/>} />
      <Route path='/list' element={<List token={token}/>} />
      <Route path='/orders' element={<Orders token={token}/>} />
    </Routes>
      </div>
     
    

    </div>
  ):<Login setToken={setToken}/>}
  </div>
}

export default App
