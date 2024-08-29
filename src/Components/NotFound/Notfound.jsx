import React from 'react'
import notfound from './../../assets/download.jpeg'


export default function Notfound() {
  return (
    <>
    <div className="container mx-auto  text-center ">
        <img src={notfound} className="w-full lg:w-2/3 mx-auto"  alt="notfound"/>
    </div>
    </>
  )
}
