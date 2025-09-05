import React, { useContext,useEffect,useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from '../Component/Title'
import { assets } from '../assets_/frontend_assets/assets'
import ProductItem from '../Component/ProductItem'
const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext)
  const [showFilter ,setShowFilter]=useState(false);
  const [filterProducts,setFilterPdt]=useState([]);
  const [category,setcategory]=useState([])
  const [subCategory,setsubcategory]=useState([])
  const [sortType,setSortType]=useState(['relevant'])
  const setSort=()=>{
    let fpcopy=filterProducts.slice();//it will create one copy of the filter product
    switch(sortType){
      case 'low-high':
        setFilterPdt(fpcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setFilterPdt(fpcopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        setFilterPdt(fpcopy);
        break;
        //here in future we can use ml model to provide relevant pdt
    }
  }
  useEffect(()=>{
    setSort();
    //whenever sortType will change this function will be called
  },[sortType])
  const handleCategory=(e)=>{
      if(category.includes(e.target.value)){
        setcategory(category.filter((item)=>(item!==e.target.value)))
      }else{
        setcategory([...category,e.target.value])
      }
  }
  const handleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
        setsubcategory(subCategory.filter((item)=>(item!==e.target.value)))
      }else{
        setsubcategory([...subCategory,e.target.value])
      }
  }
  useEffect(()=>{
      let newpdt=products.filter((item)=>{
        if((category.length==0||category.includes(item.category))&&(subCategory.length==0||subCategory.includes(item.subCategory))){
          return item;
        }
      })

      if(showSearch&&search){
        newpdt=newpdt.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
      }
    setFilterPdt(newpdt);
    // setFilterPdt(products)
  },[category,subCategory,products,search,showSearch])

//   useEffect(()=>{
// console.log(category,subCategory)
//   },[category,subCategory])
  return (
    <div className=" flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
      {/* filter Options */}
      <div className="w-full md:w-1/5">
      <p onClick={()=>{setShowFilter(!showFilter)}} className='my-5 font-light text-2xl text-gray-700  flex gap-2 items-center'>FILTERS
        <img src={assets.dropdown_icon} alt='drop down' className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`}/>
      </p>
       {/* category filter */}
<div  className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} md:block`} >
<p className='  font-medium text-gray-500 mb-4'>CATEGORY</p>
<div className="flex flex-col gap-2 font-light text-gray-600">
  <p className="flex gap-2">
    <input type="checkbox" value={'Men'} className='w-3' onChange={handleCategory}/>Men
  </p>
    <p className="flex gap-2">
    <input type="checkbox" value={'Women'} className='w-3' onChange={handleCategory}/>Women
  </p>
    <p className="flex gap-2">
    <input type="checkbox" value={'Kids'} className='w-3' onChange={handleCategory}/>Kids
  </p>
</div>

</div>

       {/* subCategory Filter */}
<div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter?'':'hidden'} md:block `} >
<p className='  font-medium text-gray-500 mb-4'>TYPE</p>
<div className="flex flex-col gap-2 font-light text-gray-600">
  <p className="flex gap-2">
    <input type="checkbox" value={'Topwear'} className='w-3' onChange={handleSubCategory}/>Topwear
  </p>
    <p className="flex gap-2">
    <input type="checkbox" value={'Bottomwear'} className='w-3' onChange={handleSubCategory}/>Bottomwear
  </p>
    <p className="flex gap-2">
    <input type="checkbox" value={'Winterwear'} className='w-3' onChange={handleSubCategory}/>Winterwear
  </p>
</div>

</div>

      </div>

      {/* right side */}
      <div className="w-full md:w-4/5">
        <div className="flex justify-between text-base md:text-2xl mb-4 w-full">
           <div className="">
          <Title title1={'ALL'} title2={'COLLECTIONS'}/>
          <p className='w-[5] bg-gray-700'></p>
        </div>
        {/* sort Pdt */}
        <select onChange={(e)=>{setSortType(e.target.value)}} className='border border-gray-500 font-light text-sm px-2 rounded-sm w-40 md:w-auto'>
          <option value="relevant">Sort by relevant</option>
          <option value="low-high">Sort by low to high</option>
          <option value="high-low">Sort by high to low</option>
        </select>
        </div>
       
        {/* all products */}
        <div className="w-full  grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filterProducts.map((item)=>{
              return  <ProductItem key={item._id} name={item.name} img={item.image[0]} price={item.price} id={item._id}/>
            })}
        </div>
      </div>
    </div>
  )
}

export default Collection
