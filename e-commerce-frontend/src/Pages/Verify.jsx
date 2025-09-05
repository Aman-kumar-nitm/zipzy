import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify'
const Verify = () => {

    const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext);
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');

    const verifyPayment=async()=>{
        try {
            if(!token){
                return null;
            }
            const response=await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}});
            console.log(response.data);
            console.log(response.data.success);
            if(response.data.success){
                setCartItems({});
                navigate('/order')
            }else{
                toast.error('unable to pay try again')
                navigate('/cart');
               
            }
        } catch (error) {
            toast.error('unable to pay try again')
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
