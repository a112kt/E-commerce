import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function CheckOut() {

    let {onlinePayment} = useContext(CartContext)
   

    let formik = useFormik(
        {
          initialValues:{
          details: "",
          phone: "",
          city: ""
          },
          
          onSubmit:(values)=>{
          payOnline(values)
          },
        }
      );

     async function payOnline(values){    
            await onlinePayment(values) 
      }

  return (
    <>
    <div className="mt-40 w-1/2 mx-auto">
    <h1 className='text-4xl font-black font-bold'>Online Pay:</h1>
    <form onSubmit={formik.handleSubmit}>
        <div className='my-4'>
            <label htmlFor="details" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">details:</label>
            <input name='details' onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} type="text"  id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.details && formik.errors.details?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.details}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="phone" className="block mb-2 text-md font-medium text-gray-900 dark:text-white"> phone :</label>
            <input name='phone'  type="text" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.phone && formik.errors.phone?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div> :null}
        </div>
      
        
        <div className='my-2'>
            <label htmlFor="city" className="block mb-2 text-md font-medium text-gray-900 dark:text-white"> city :</label>
            <input name='city'  type="text" id="city" onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.city && formik.errors.city?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.city}
            </div> :null}
        </div>
        
        <div className="text-end my-5">
            <button type='submit' className='text-white border border-white rounded-lg p-3 px-10 mr-0 bg-green-400' disabled={!(formik.isValid && formik.dirty)}>Pay Now</button>
        
        </div>

      </form>
    </div>
    
    </>
  )
}
