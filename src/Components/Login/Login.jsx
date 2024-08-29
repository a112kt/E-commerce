
import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {

  let {token,setToken}=useContext(TokenContext)

  const[user,setUser] = useState(null)
  const[erro,seterro] = useState(null)
  const[isloading,setisloadind]=useState(false)

  let myScheme = Yup.object({
    email:Yup.string().required('email is required').email('enter avalid email'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,8}$/,'password not valid'),


  })
  let formik = useFormik(
    {
      initialValues:{
       
        email:"",
        password:"",
        
      },
      validationSchema:myScheme,
      onSubmit:(values)=>{
       loginForm(values) 
      },
    }
  );
  async function loginForm(values){
    setisloadind(true)
     return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then(data=>{
      console.log(data.data);
      setUser(data.data.message)

      localStorage.setItem("userToken",data.data.token)
      setToken(data.data.token)
      setisloadind(false)
      navigate("/")
     }).catch((err)=>{
      console.log(err.response.data.message);
      setisloadind(false)
      seterro(err.response.data.message)
     })
  
    }
  
  let navigate = useNavigate();
  return (
    <>
    <div className="container mx-auto mt-20 p-8   ">
      <h2 className='text-4xl font-semibold '>Login now :
        {erro?<div class="p-4 mt-8 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {erro}
</div>:null}
        {user?<div class="p-4 mt-8 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    {user}
    </div>:null}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='my-8'>
            <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">email :</label>
            <input name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email"  id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
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
        
        <div className="text-end my-5">
          {isloading ? <button type='submit' className='text-white border border-white rounded-lg p-3 px-10 mr-0 bg-green-400'>
            <i className='fa fa-spinner fa-spin'></i>
          </button>:<button type='submit' className='text-white border border-white rounded-lg p-3 px-10 mr-0 bg-green-400' disabled={!(formik.isValid && formik.dirty)}>Log In</button>}
        </div>

      </form>
    </div>
    </>
  )
}
