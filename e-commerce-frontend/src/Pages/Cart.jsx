import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title'
import { assets } from '../assets_/frontend_assets/assets';
import CartTotal from '../Component/CartTotal';
const Cart = () => {
  const {products,currency,cartItems,updateCartItems}=useContext(ShopContext);
  const [cartData,setCartData]=useState([])
  useEffect(()=>{
    const tempData=[];
    for(const items in cartItems){
      for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            tempData.push({
              _id:items,
              size:item,
              quantity:cartItems[items][item]
            })
          }
      }
    }

    setCartData(tempData);
  },[cartItems])
  return (
    <div className='my-20'>
      <Title title1={'YOUR'} title2={'CART'} />
      {/* we need to traverse on tempData */}
        <div className="flex flex-col pt-10 ">
          {cartData.map((item,index)=>{
            const pdt=products.find((p)=>p._id===item._id);
            return <div className="flex justify-between  border-b items-center px-4 border-gray-100" key={index}>
              <div className="flex gap-6 py-4">
                <img src={pdt.image[0]} alt='pdt_image' className='w-16 sm:w-20'/>
                <div className="flex flex-col  gap-2">
                  <h4 className='text-gray-400 font-medium '>{pdt.name}</h4>
                  <div className="flex gap-4 items-center ">
                    <p className='font-medium'>${pdt.price}</p>
                    <p className='text-center  p-2 bg-gray-100 w-10 border border-gray-200'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input type="number"  min={1} onChange={(e)=>e.target.value===''||e.target.value=='0'?null:updateCartItems(item._id,item.size,Number(e.target.value))}defaultValue={item.quantity} className=' border border-gray-200 px-2 py-1 w-25'/>
              <img src={assets.bin_icon} alt='delete_icon' className='w-4 h-4 cursor-pointer' onClick={()=>{updateCartItems(item._id,item.size,0)}}/>
            </div>
          })}
        </div>

        <div className="my-10 md:flex justify-end ">
          <CartTotal/>
        </div>
      
    </div>
  )
}

export default Cart
