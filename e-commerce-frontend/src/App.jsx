import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Orders from './Pages/Orders'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import Login from './Pages/login'
import PlaceOrder from './Pages/PlaceOrder'
import Product from './Pages/Product'
import Navbar from './Component/navbar'
import Footer from './Component/Footer'
import SearchBar from './Component/SearchBar'
import SignUp from './Pages/SignUp'
  import { ToastContainer, toast } from 'react-toastify';
import Verify from './Pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/collection" element={<Collection/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/order" element={<Orders/>} />
      <Route path="/placeOrder" element={<PlaceOrder/>} />
      <Route path="/product/:productId" element={<Product/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/verify" element={<Verify/>} />
    </Routes>
    <Footer/>
    </div>
  )
}

export default App
