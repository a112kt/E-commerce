import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick';

export default function CategraySlider() {
    var settings = {
        dots: true,
        // infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        
      };


    function getCategraySlider(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    let {data}= useQuery({
        queryKey:["categorySlider"],
        queryFn:getCategraySlider
    })
    console.log(data?.data?.data
        
    )
    
  return (
    <>
    <div className="text-center px-20">
    <Slider {...settings}>
           {data?.data?.data.map((cat)=><div className='' >
           <img src={cat.image} className='h-[200px] w-full' alt="" />
           <p>{cat.name}</p>
           </div>)}
    </Slider>
      
    </div>
     


    
   </>
  )
}

