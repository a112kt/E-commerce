import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'

export default function Categery() {
  const [cats,setCats] =useState([])
  const[isloading,setIsLoadind]= useState(true)



 async function getCategray(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories").then((data)=>{
    console.log(data?.data?.data)
    setCats(data?.data?.data)
    setIsLoadind(false)

  }).catch((error)=>{
    console.log(error)
    setIsLoadind(false)
  })
 }

 useEffect(()=>{
  getCategray()
 },[])
  return (
    <>
    <div className="mt-20">
      <div className="p-8">
       {isloading?<Loader/>: <div className="flex flex-wrap justify-between items-center p-4 ">
       {cats.map((cat)=><div className="product w-full md:w-1/2 lg:w-1/3 border-2 p-4 gap-1">
       <img src={cat.image} className='w-full h-[300px]'  alt="" />
       <h2 className='text-3xl text-green-500'>{cat.name}</h2>
       </div>)}
        </div>}
      </div>
      </div></>
  )
}
