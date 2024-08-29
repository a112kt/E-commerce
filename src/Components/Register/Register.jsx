import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';



export default function Register() {

  const[user,setUser] = useState(null)
  const[erro,seterro] = useState(null)
  const[isloading,setisloadind]=useState(false)
  
  let navigate = useNavigate()


  let myScheme = Yup.object({
    name:Yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email:Yup.string().required('email is required').email('enter avalid email'),
    phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'phone not valid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,8}$/,'password not valid'),
    rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')])

  })

  let formik = useFormik(
    {
      initialValues:{
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      },
      validationSchema:myScheme,
      onSubmit:(values)=>{
       registerForm(values) 
      },
    }
  );

async function registerForm(values){
  setisloadind(true)
   return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(data=>{
    console.log(data.data.message)
    setUser(data.data.message)
    setisloadind(false)
    navigate("/Login")
   }).catch((err)=>{
    console.log(err.response.data.message);
    setisloadind(false)
    seterro(err.response.data.message)
   })

  }
       

  return (
    <>
    <div className="container mx-auto mt-10 p-8   ">
      <h2 className='text-4xl font-semibold '>register now :
        {erro?<div class="p-4 mt-8 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {erro}
</div>:null}
        {user?<div class="p-4 mt-8 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    {user}
    </div>:null}</h2>
      <form onSubmit={formik.handleSubmit}>
      <div className='mt-8'>
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Name :</label>
            <input name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}  type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
           {formik.touched.name && formik.errors.name?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">email :</label>
            <input name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.email && formik.errors.email?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="Password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password :</label>
            <input name='password'  type="password" id="Password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.password && formik.errors.password?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="Password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Re-password :</label>
            <input name='rePassword' onChange={formik.handleChange}  value={formik.values.rePassword} onBlur={formik.handleBlur}  type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.rePassword && formik.errors.rePassword?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.rePassword}
            </div> :null}
        </div>
        <div className='my-2'>
            <label htmlFor="Phone" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Phone :</label>
            <input name='phone' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} type="tel" id="Phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.phone && formik.errors.phone?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div> :null}
        </div>
         <div className="text-end my-5">
          {isloading ? <button type='submit' className='border border-black rounded-lg p-3 px-6 mr-0'>
            <i className='fa fa-spinner fa-spin'></i>
          </button>:<button type='submit' className='border border-black rounded-lg p-3 px-6 mr-0'disabled={!(formik.isValid && formik.dirty)} >Register Now</button>}
        </div>


      </form>
    </div>
    </>
  )
}
