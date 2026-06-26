import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Slider from 'react-slick';

export default function CategraySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
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
    <div className="container mx-auto px-4 mt-12">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-left px-2">Shop Popular Categories</h2>
      <Slider {...settings}>
             {data?.data?.data.map((cat)=><div key={cat.id || cat.name} className='px-2 outline-none' >
               <div className="bg-white rounded-xl border border-gray-100 p-2 shadow-sm hover:shadow transition-shadow duration-300">
                 <img src={cat.image} className='h-[200px] w-full object-cover rounded-lg' alt={cat.name} />
                 <p className="mt-2 text-sm font-medium text-gray-800 truncate">{cat.name}</p>
               </div>
             </div>)}
      </Slider>
    </div>
     


    
   </>
  )
}

