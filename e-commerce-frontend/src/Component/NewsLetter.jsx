import React from 'react'

const NewsLetter = () => {
  const onSubmitHandler=(event)=>{
    event.preventDefault();//Without it → the browser reloads the page on submit.
    

  }
  return (
    <div className="my-20 flex flex-col gap-5 items-center justify-center">
        <p className='sm:4xl lg:text-4xl font-semibold '>Subscribe now & get 20% off</p>
        <p className='text-sm text-gray-500 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <form className="flex w-full lg:w-[60%] border border-gray-400 justify-between"  onSubmit={onSubmitHandler} >
            <input type='email' placeholder='Enter Your Email Id' className='text-sm pl-3 w-full'></input>
            <button type="submit" className='py-3 px-5 bg-black text-white cursor-pointer'>Subscribe</button>
        </form>
        

    </div>
  )
}

export default NewsLetter
