import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'


export default function Cart() {


  const [cartItems,setCartItems] = useState([])
  const[isloading,setIsLoadind]= useState(true)
  

  let {getCartProduct,totalPrice,settotalPrice,deleteProduct,clearCart,updateCartItem,noOfCartItems} = useContext(CartContext)

  async function getCart(){
     
    let response = await getCartProduct();
    console.log(response?.data?.data.products,"cart");
    setCartItems(response?.data?.data.products)
    setIsLoadind(false)
    
  }
 
  async function deleteItem(productId){
     
    let response = await deleteProduct(productId);
    console.log(response);
    setCartItems(response?.data?.data.products)

  }

  async function updateProduct(productId,count){
     
    let response = await updateCartItem(productId,count);
    console.log(response);
    setCartItems(response?.data?.data.products)

  }

  async function clearCartItem(productId,count){
     
    let response = await clearCart();
    setCartItems([])
   
  }



  useEffect(()=>{
    getCart();
  },[])

 
 

  return (
    <>
    
  {cartItems?<div className="relative container mx-auto p-8 overflow-x-auto shadow-md mt-20 sm:rounded-lg">
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
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
         unit Price
        </th>
        <th scope="col" className="px-6 py-3">
         Total Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {cartItems.map((item)=><tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {item.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button  
             onClick={()=>updateProduct(item.product.id, item.count-1)}  
             className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
             
            </button>
            <div>
              <span>{item.count}</span>
            </div>
            <button
             onClick={()=>updateProduct(item.product.id, item.count+1)}  
             className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {item.price} EGP
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {item.price * item.count} EGP
        </td>
        <td className="px-6 py-4">
          <a onClick={()=>deleteItem(item.product.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
      <tr>
        <th className="text-gray-800 text-2xl">
         Total Price:
        </th>
        <th  className="p-4 text-gray-800 text-2xl">
        {totalPrice} EGP
        </th>
        
 
      
       <div className="text-center mx-10">
      <button onClick={()=>clearCartItem()} className='text-black px-10 py-3 border text-xl border-green-300 rounded-md mt-20'>Clear your Cart</button>
    </div> 

    <div className="text-center mx-10 mt-20 text-2xl text-black ">
        <h2>number of items: {noOfCartItems}</h2>
      </div>    
    <div className="text-center mt-10 ">
      <Link to={"/Address"} className='px-4 border-2 py-2 text-2xl text-white bg-blue-600 shadow-blue-600'>Check Out</Link>
    </div> 

      </tr>
      
    </tbody>
  </table>
</div>:<div className='mx-auto px-10 mt-40 text-3xl font-medium'>
  <div className="p-10 bg-gray-300 py-2"><h2 className='py-4'>Cart Shop</h2>
  <p className='py-4'>your cart is empty</p></div>
</div>
}

  
    </> 
  )
}
