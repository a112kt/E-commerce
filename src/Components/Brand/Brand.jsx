import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'

export default function Categery() {
  const [brands,setbrands] =useState([])
  const[isloading,setIsLoadind]= useState(true)



 async function getBrand(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((data)=>{
    console.log(data?.data?.data)
    setbrands(data?.data?.data)
    setIsLoadind(false)

  }).catch((error)=>{
    console.log(error)
    setIsLoadind(false)
  })
 }

 useEffect(()=>{
  getBrand()
 },[])
  return (
    <>
    <div className="mt-20">
      <div className="p-8">
        <h1 className='text-center text-6xl text-green-400'>All Brands</h1>
       {isloading?<Loader/>: <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
       {brands.map((brand)=><div className="product w-full md:w-1/2 lg:w-1/4 border-2">
       <img src={brand.image} className='w-full h-[200px]'  alt="" />
       <h2 className='text-xl text-center mt-2 text-gray-500'>{brand.name}</h2>
       </div>)}
        </div>}
      </div>
      </div></>
  )
}
