import React from 'react'
import photo1 from './../../assets/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import photo2 from './../../assets/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import photo3 from './../../assets/61cSNgtEISL._AC_SY200_.jpg'
import photo4 from './../../assets/41nN4nvKaAL._AC_SY200_.jpg'
import photo5 from './../../assets/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import Slider from 'react-slick';


export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        
       
      };
  return (
    <>
    <div className="container mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-2xl overflow-hidden shadow-md">
            <div className="md:col-span-2 overflow-hidden">
                <Slider {...settings}>
                    <img src={photo3} className='w-full h-[300px] object-cover' alt="photo3" />
                    <img src={photo5} className='w-full h-[300px] object-cover' alt="photo5" />
                    <img src={photo4} className='w-full h-[300px] object-cover' alt="photo4" />
                </Slider>
            </div>
            <div className="flex flex-col md:h-[300px]">
                <img src={photo1} className='w-full h-[150px] object-cover' alt="photo1" />
                <img src={photo2} className='w-full h-[150px] object-cover' alt="photo2" />
            </div>
        </div>
    </div>

    
    </>
  )
}
