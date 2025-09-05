import React, { useContext, useEffect,useState } from 'react'
import {ShopContext} from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {

    const {products}=useContext(ShopContext);
    const [latestProducts,setLatestProducts]=useState([]);
    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title title1={'LATEST' } title2={'COLLECTIONS'}/>
            <p className='text-center text-sm text-gray-700 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis earum minima, qui temporibus soluta nihil?</p>
        </div>

        {/* recently added 10 product */}

        <div className="w-full grid  grid-cols-2 gap-6 shadow-lg sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4">
            {latestProducts.map((item)=>{
                // console.log(item._id);
                return <ProductItem id={item._id} img={item.image[0]} name={item.name} price={item.price} key={item._id}/>
            })}
        </div>
    </div>
  )
}

export default LatestCollection
