import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { WishContext } from '../../Context/wishContext'


export default function Wish() {

  let [WishItems,setWishItems] = useState([])


  
  

  let {getWishProduct,deleteProduct,clearWish} = useContext(WishContext)

  async function getWish(){
     
    let response = await getWishProduct();
    console.log(response?.data?.data,"Wish");
    setWishItems(response?.data?.data)
    setIsLoadind(false)
    
  }
 
  async function deleteItem(productId){
     
    let response = await deleteProduct(productId);
    console.log(response);
    setWishItems(response?.data?.data)

  }

 

  async function clearWishItem(productId,count){
     
    let response = await clearWish();
    setWishItems([])
   
  }



  useEffect(()=>{
    getWish();
  },[])

 
 

  return (
    <>
    
  {WishItems?<div className="relative container mx-auto p-8 overflow-x-auto shadow-md mt-20 sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
         unit Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {WishItems.map((item)=><tr key={item.data?.dataid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {item.price} EGP
        </td>
       
        <td className="px-6 py-4">
          <a onClick={()=>deleteItem(item.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
  
      
    </tbody>
  </table>
</div>:<div className='mx-auto px-10 mt-40 text-3xl font-medium'>
  <div className="p-10 bg-gray-300 py-2"><h2 className='py-4'>Wish List</h2>
  <p className='py-4'>your WishList is empty</p></div>
</div>
}

  
    </> 
  )
}
