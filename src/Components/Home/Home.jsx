import React from 'react'
import FeatureProduct from '../FeatureProduct/FeatureProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategraySlider from '../CategraySlider/CategraySlider'


export default function Home() {
  return (
    <>
   <MainSlider/>
   <CategraySlider/>

   <form className=" w-3/4 py-8 mx-auto">
    <input type="text" name="text" className="w-full border rounded-xl" placeholder='search' id="" />
   </form>



    <FeatureProduct/>
    </>
  )
}
