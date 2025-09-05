import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id,img,name,price}) => {
    const {currency}=useContext(ShopContext)
  return (

    <Link to={`/product/${id}`} key={id}>
        <div className="flex flex-col gap-1 ">
            <div className="overflow-hidden">
                <img src={img} alt='item_img' className='w-auto h-[300px] md:h-[250px] transform transition duration-500 ease-in-out hover:scale-110 '/>
            </div>
                    
                    <p className='text-gray-400 font-light text-sm text-center'>{name}</p>
                    <p className='text-gray-700 font-semibold pl-4'>{currency}{price}</p>
                </div>
    </Link>
    
  )
}

export default ProductItem
