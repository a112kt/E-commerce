import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/wishContext'


export default function FeatureProduct() {

  let {addProductToWish} = useContext(WishContext)


  async  function addToWish(productId){
    let response =  await  addProductToWish(productId);
    console.log(response)
    }


    let {addProductToCart} = useContext(CartContext)


  async  function addToCart(productId){
    let response =  await  addProductToCart(productId);
    console.log(response)
    }


    


    function getFeatureProducts(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")

    }

    let {data,isError,isLoading,isFetched,error} = useQuery({
        queryKey:["featureProducts"],
        queryFn:getFeatureProducts,
        staleTime:5000,

            
    })
    
    console.log(data?.data?.data)





    // const [Products,setProducts]=useState([])
    // const[isloading,setIsLoadind]= useState(true)


    // async function getProducts() {

    //     return axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
    //       console.log(data.data.data) 
    //       setProducts(data.data.data)
    //       setIsLoadind(false)
        
    //     }).catch((error)=>{
    //         console.log(error);
    //         setIsLoadind(false)
    //     })

        
    // }
    // useEffect(()=>{
    //     getProducts()

    // },[])

  return (
    <>

    <div className="container mx-auto mt-20">
        {isLoading?<Loader/>:
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-4">
        {data?.data?.data.map((product)=><div key={product.id} className="product group relative p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div className="relative">
            {/* Wishlist Heart Button - Top Right of Image */}
            <button 
              onClick={(e)=>{
                e.preventDefault();
                addToWish(product.id);
              }} 
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-200 focus:outline-none p-2 rounded-full shadow-sm cursor-pointer"
              title="Add to Wishlist"
            >
              <i className="fa-solid fa-heart text-xl"></i>
            </button>

            <Link to={`/productsdetails/${product.id}`} className="block">
              <div className="overflow-hidden rounded-lg mb-3 bg-gray-50 aspect-square flex items-center justify-center">
                <img src={product.imageCover} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' alt={product.title} />
              </div>
              <h4 className='text-xs font-semibold text-green-500 uppercase tracking-wider'>{product.category.name}</h4>
              <p className='text-gray-900 mt-1 font-medium text-sm line-clamp-2 h-10 hover:text-green-500 transition-colors'>{product.title}</p>
              <div className="flex justify-between items-center mt-3 text-sm">
                <p className='font-bold text-gray-950'>{product.price} EGP</p>
                <div className="flex items-center text-yellow-400 gap-1">
                  <i className='fa fa-star'></i>
                  <span className="text-gray-600 text-xs font-semibold">{product.ratingsAverage || product.ratingsQuantity}</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={()=>addToCart(product.id)} 
              className='w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-medium text-sm py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 flex items-center justify-center gap-2'
            >
              <i className="fa-solid fa-cart-plus"></i>
              Add To Cart
            </button>    
          </div>
        </div>)} 
      </div>
        }
        
    </div>
    
    

    </>
  )
}
