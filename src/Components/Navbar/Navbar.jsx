import React, { useContext, useEffect } from 'react'
import logo from "./../../assets/download.png"
import { Link, useNavigate } from 'react-router-dom'
import { TokenContext } from '../../Context/TokenContext'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {
  let navigate = useNavigate()
 let {token, setToken}=useContext(TokenContext);
 let {noOfCartItems,getCartProduct} = useContext(CartContext)

 async function getCart(){
     
  getCartProduct();
  
}
useEffect(()=>{
  getCart()
},[])






 function logOut(){
  localStorage.removeItem("userToken")
  setToken(null);
  navigate("/Login")

 }
  return (
    <>
<div className="">
<nav className="fixed bg-gray-50 z-50 top-0 right-0 left-0 border-gray-200 dark:bg-gray-900 bg-slate-00"  >
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <Link to='/' className="flex items-center space-x-3 text-3xl rtl:space-x-reverse px-10"> <img src={logo} className="h-10 w-10 rounded-full mx-2" alt="Freshcart logo"/>
  Fresh cart</Link>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pr-10" id="navbar-cta">
  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    {token?
    <>
     <li className='relative'>    
    <i className="fa-solid fa-cart-shopping text-4xl text-gray-500"></i>
    <span className="absolute left-6 top-0 bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      {noOfCartItems}
    </span>
  </li> 
   
    <li>    
        <a href="#" onClick={()=>logOut()} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" >Log Out</a>
      </li>   
    </>
     
      :<>
      <li>
        <Link to='Register' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">register</Link>
    </li>
      
    <li>
        <Link to='Login' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Log in</Link>
    </li>
      </>}
    
    
    </ul>
  </div>
    
      <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" ariahidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
   {token? <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
    <li>
        <Link to='/' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
      </li>
      <li>
        <Link to='Cart' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Cart
        </Link>
      </li>
      <li>
        <Link to='WishList' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Wish List</Link>
      </li>
      <li>
        <Link to='Product' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Product</Link>
      </li>
      <li>
        <Link to='Categery' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Categray</Link>
      </li>
      <li>
        <Link to='Brand' className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Brands</Link>
      </li>
    
    </ul>:null}
  </div>
  </div>
</nav>

</div>
    </>
  )
}
