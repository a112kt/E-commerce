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
        <div className="flex flex-wrap">
        {data?.data?.data.map((product)=><div key={product.id} className="product p-3 w-full md:w-1/3 lg:w-1/6 ">

        


         <Link to={`/productsdetails/${product.id}`}>
         <img src={product.imageCover} className='w-full' alt="" />
          <h4 className='text-green-400'>{product.category.name}</h4>
          <p className='text-slate-950 mt-3 font-medium'>{product.title}</p>
          <div className="flex justify-between items-center text-slate-800 mt-3 ">
              <p className='w-1/2'>{product.price}EGP</p>
              <div className="w-1/2"><i className='fa fa-star text-yellow-200'></i>{product.ratingsQuantity}</div>
          </div>
         </Link>



          <div className="text-end text-3xl"><i onClick={()=>addToWish(product.id)} className=" fa-solid fa-heart "></i></div>
          
          
          
          
          <div className="btn text-center ">
              <button onClick={()=>
                addToCart(product.id)} className=' bg-green-400 text-white px-3 py-2 rounded-md'>Add To Cart</button>    
          </div>
          </div>)} 
      </div>
        }
        
    </div>
    
    

    </>
  )
}
