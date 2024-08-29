import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {

    let {addProductToCart} = useContext(CartContext)


    async  function addToCart(productId){
      let response =  await  addProductToCart(productId);
      console.log(response)
      }



    let {id} = useParams();
    const [ProductDetail,setProductDetails] = useState({});
    const [isLoading,setIsLoadind] = useState(true);
    const [errorMessage,setErrorMassage] = useState(null);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
      };

  async  function getProductDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
        setProductDetails(data?.data.data)
        setIsLoadind(false)
        }).catch((error)=>{
            setErrorMassage(error.message);
            setIsLoadind(false)
            console.log(error)
        })

    }
    useEffect(()=>{
       

       getProductDetails()
    },[])


  return (
    <>
    {isLoading?<Loader/>:<div className="container mx-auto p-10">
        <div className="flex">
           <div className="w-1/4">
           <Slider {...settings}>
            {ProductDetail?.images?.map((src)=><img src={src} alt="" />)}
     
    </Slider>


           {/* <img src={ProductDetail.imageCover} alt="" /> */}
           </div> 
           <div className="w-3/4 mt-10 p-6">
           <h1 className='text-black my-5 font-bolder text-4xl'>{ProductDetail.title}</h1>
           <h3 className='text-gray-700 my-5'>{ProductDetail?.description}</h3>
           <p>{ProductDetail.category?.name}</p>
           <div className="flex justify-between items-center text-slate-800 my-3 ">
              <p className='w-1/2'>{ProductDetail?.price}EGP</p>
              <div className="w-1/2"><i className='fa fa-star text-yellow-200'></i>{ProductDetail.product?.ratingsQuantity}</div>
          </div>
          <div className="text-center w-full p-3 ">
              <button onClick={()=>addToCart(ProductDetail.id)} className=' bg-green-400 w-full text-white px-3 py-2 rounded-md'>Add To Cart</button>    
          </div>
           </div>
        </div>
    </div>}
    
    </>
  )
}
