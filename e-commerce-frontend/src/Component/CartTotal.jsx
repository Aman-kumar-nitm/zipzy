import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {getCartAmount,shippingFee,navigate}=useContext(ShopContext);
  return (
    <div className='w-full md:w-1/2  flex flex-col '>
        <Title title1={'CART'} title2={'TOTALS'}/>
        <div className="flex justify-between border-t border-gray-200 py-3 ">
            <p>Subtotal</p>
            <p>${getCartAmount()}.00</p>
        </div>
        <div className="flex justify-between border-t border-gray-200 py-3">
            <p>Shipping Fee</p>
            <p>${shippingFee}.00</p>
        </div>
        <div className="flex justify-between border-t border-gray-200 py-3">
            <p>Total</p>
            <p>${getCartAmount()===0?0:getCartAmount()+shippingFee}</p>
        </div>
      

      <button type="button" className='text-center py-4 px-8 bg-black text-white font-semibold rounded-md cursor-pointer my-10 mx-auto' onClick={()=>{navigate('/placeOrder')}}>Proceed To CheckOut</button>
    </div>
  )
}

export default CartTotal
