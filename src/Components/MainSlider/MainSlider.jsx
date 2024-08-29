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
    <div className="p-10 mx-auto mt-20">
        <div className="flex p-4 justify-center">
            <div className="lg:w-1/4 md:w-1/2 w-full ">
            <Slider {...settings}>
            <img src={photo3} className='h-[260px]' alt="photo3" />
            <img src={photo5} className='h-[200px]' alt="photo5" />
            <img src={photo4} className='h-[260px]' alt="photo4" />
    </Slider>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full">
            <img src={photo1} className='h-[150px]' alt="photo1" />
            <img src={photo2} className='h-[150px]' alt="photo2" />
            </div>
        </div>
    </div>

    
    </>
  )
}
