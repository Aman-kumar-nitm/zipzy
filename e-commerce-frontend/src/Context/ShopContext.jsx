import React, { createContext, useContext,useEffect,useState } from 'react'
import axios from 'axios'
// import { products } from '../assets_/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const ShopContext=createContext();
const ShopContextProvider = (props) => {
    const navigate=useNavigate();
    const currency='$'
    const shippingFee=10
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [products,setProducts]=useState([])
    const [token,setToken]=useState('')
    // for cart section
    const [cartItems,setCartItems]=useState({})
    const addToCart=async(itemId,size)=>{
        let cartData=structuredClone(cartItems);
        if(!size){
            toast.error('Please Select Size')
            return;
        }
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }

        setCartItems(cartData)
        //now when we are adding into cart that time we will add on database of that user too
        if(token){
          try {
            await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
          } catch (error) {
            toast.error('internal server error to add cart Data')
          }
        }
        
    }

    const getCartCount = () => {
  let totalCount = 0;

  for (const productId in cartItems) {
    const sizes = cartItems[productId];
    for (const size in sizes) {
      const quantity = sizes[size];
      if (quantity > 0) {
        totalCount += quantity;
      }
    }
  }


  return totalCount;
};
const getCartAmount=()=>{
  let totalAmount=0;
  for (const productId in cartItems) {
    const cpdt=products.find((item)=>item._id===productId);
    const sizes = cartItems[productId];
    for (const size in sizes) {

      try {
        const quantity = sizes[size];
        if(quantity>0){
            totalAmount+=(cpdt.price*quantity);
        }
      } catch (error) {
        
      }
      
      //from the productId we can find out the price
      
      
    }
  }
  return totalAmount;
}
const updateCartItems=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemId][size]=quantity;
    setCartItems(cartData);

    try {
      await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}});
    } catch (error) {
      toast.error('unable to update cart items')
    }
}

const getProductsData=async()=>{
try {
  const response=await axios.get(backendUrl+'/api/product/list');
  // console.log(response.data);
  if(response.data.success===true){
    setProducts(response.data.allProducts);
  }else{
    toast.error('unable to fetch data')
  }

} catch (error) {
  toast.error('Internal Server Error1')
}
}

const getUserCart=async(token)=>{
try {
  const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
  if(response.data.success){
 setCartItems(response.data.cartData);
 console.log(response.data.cartData)
  }else{
    toast.error(response.msg);
  }
 
} catch (error) {
  toast.error('unable to fetch cart Itmes')
}
}
useEffect(()=>{
   getProductsData();
},[])
useEffect(()=>{
  if(!token&&localStorage.getItem('token')){
    setToken(localStorage.getItem('token'))
    
  }
},[])
useEffect(() => {
  // whenever token changes and is non-empty, fetch user cart
  if (token) {
    getUserCart(token);
  }
}, [token]);
    const value={
        products,currency,shippingFee,search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateCartItems,getCartAmount,navigate,backendUrl,token,setToken,setCartItems
    }
    
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])
  return (
    
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
 
  )
}

export default ShopContextProvider
