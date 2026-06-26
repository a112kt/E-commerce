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

  if (isloading) {
    return <Loader />
  }

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="container mx-auto px-4 mt-28 mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table Container */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-4">Product</th>
                      <th scope="col" className="px-6 py-4">Quantity</th>
                      <th scope="col" className="px-6 py-4">Price</th>
                      <th scope="col" className="px-6 py-4">Total</th>
                      <th scope="col" className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <tr key={item.product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4 min-w-[250px]">
                          <img src={item.product.imageCover} className="w-20 h-20 object-cover rounded-lg border" alt={item.product.title} />
                          <div className="truncate max-w-[150px] md:max-w-[200px]">
                            <span className="font-semibold text-gray-900 block truncate">{item.product.title}</span>
                            <span className="text-xs text-gray-400 block mt-1">{item.product.category?.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button  
                              onClick={() => updateProduct(item.product.id, item.count - 1)}  
                              className="inline-flex items-center justify-center h-8 w-8 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
                              disabled={item.count <= 1}
                            >
                              <i className="fa-solid fa-minus text-xs"></i>
                            </button>
                            <span className="w-8 text-center font-semibold text-gray-800">{item.count}</span>
                            <button
                              onClick={() => updateProduct(item.product.id, item.count + 1)}  
                              className="inline-flex items-center justify-center h-8 w-8 text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                            >
                              <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-700">
                          {item.price} EGP
                        </td>
                        <td className="px-6 py-4 font-semibold text-green-600">
                          {item.price * item.count} EGP
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => deleteItem(item.product.id)}  
                            className="text-red-500 hover:text-red-700 font-semibold cursor-pointer hover:underline text-sm focus:outline-none"
                          >
                            <i className="fa-solid fa-trash-can mr-1"></i> Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4">Order Summary</h2>
                
                <div className="flex justify-between items-center text-gray-600">
                  <span>Total Items</span>
                  <span className="font-semibold text-gray-800">{noOfCartItems}</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <span className="text-gray-800 font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-green-600">{totalPrice} EGP</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/checkout" 
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
                  >
                    Proceed to Checkout
                  </Link>
                  <button 
                    onClick={() => clearCartItem()} 
                    className="w-full border border-red-200 hover:bg-red-50 text-red-600 font-medium py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    Clear Shopping Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-28 mb-12">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-cart-shopping text-4xl text-gray-300"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm">
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
