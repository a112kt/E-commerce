
import axios from 'axios';
import { useFormik } from 'formik'
import { useState } from 'react';
import * as Yup from 'yup';


export default function Address()  {
    const[isloading,setisloadind]= useState(false)

  

  let myScheme = Yup.object({
    details:Yup.string().required('details is required'),
    phone:Yup.string().required('phone is required'),
    city:Yup.string().required('city is required'),


  })
  let formik = useFormik(
    {
      initialValues:{
       
        details: "",
        phone: "",
        city: ""
        
      },
      validationSchema:myScheme,
      onSubmit:(values)=>{
       loginForm(values) 
      },
    }
  );
  async function loginForm(values){
    setisloadind(true)
    console.log(values)


     return await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/66cb7057ba58b0b66c0335d6",{shippingAddress: values},{
        headers :{
            token:localStorage.getItem("userToken")
        },
        params:{
           url: 'http://localhost:3000'
        }
     }).then(data=>{
        setisloadind(false)
      console.log(data.session.url);
      location.href = data.session.url;
      
     }).catch((err)=>{
      console.log(err.response.data.message);
      
     })
  
    }
  
  
  return (
    <>
    <div className="container mx-auto mt-20 p-8   ">
      <h2 className='text-4xl font-semibold '>Add your Shipping Address:
       </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mt-8'>
            <label htmlFor="details" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">details:</label>
            <input name='details' onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur} type="text"  id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.details && formik.errors.details?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.details}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="phone" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">phone :</label>
            <input name='phone'  type="tel" id="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.phone && formik.errors.phone?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div> :null}
        </div>

        <div className='my-2'>
            <label htmlFor="city" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">city :</label>
            <input name='city'  type="text" id="city" onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.city && formik.errors.city?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.city}
            </div> :null}
        </div>
        
        <div className="text-end my-5">
          {isloading ? <button type='submit' className='text-white border border-white rounded-lg p-3 px-10 mr-0 bg-green-400'>
            <i className='fa fa-spinner fa-spin'></i>
          </button>:<button type='submit' className='text-white border border-white rounded-lg p-3 px-10 mr-0 bg-green-400' disabled={!(formik.isValid && formik.dirty)}>Check out</button>}
        </div>

      </form>
    </div>
    </>
  )
}
