import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';
const RelateProducts = ({category,subcategory}) => {
  //here we will filter bases on category and subcategory
  const {products}=useContext(ShopContext);
  const [related,setRelated]=useState([])
  useEffect(()=>{
    if(products.length>0){
      let productCopy = products
  .filter((item) => item.category === category)
  .filter((item) => item.subCategory === subcategory);


      setRelated(productCopy.slice(0,5))
      // since we want to show only 5 products

    }
  },[products])
  return (
    <div className='my-24'>
      <Title title1={'RELATED'} title2={'PRODUCTS'}/>
       <p className='w-5 bg-gray-700'></p>
                 
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 w-full justify-between mt-20 gap-2">
         {related.map((item)=>{
         return <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} img={item.image[0]}/>
         })}
      </div>
     
    </div>
  )
}

export default RelateProducts
