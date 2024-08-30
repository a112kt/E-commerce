
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik'
import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ForgetPaa() {

   let [errorMsg,setErrorMsg] = useState('')
   let nav = useNavigate()
   const [formState, setFormState] = useState(true)
    let myScheme = Yup.object({  
        email:Yup.string().required('email is required').email('enter avalid email'), 
      })

      let myScheme2 = Yup.object({  
        resetCode:Yup.string().required('resetCode is required').matches(/^[0-9]{5,7}$/,"enter Valid Code"), 
      })



      let formik = useFormik(
        {
          initialValues:{
            email:"",
          },
          validationSchema:myScheme,
         onSubmit: ForgetPassword,
        }
      );

      let formik2 = useFormik(
        {
          initialValues:{
            resetCode:"",
          },
          validationSchema:myScheme2,
          onSubmit:(val)=>{
            verifyResetCode(val)
          },
        }
      );


      async function ForgetPassword(value) {
        console.log(value,"value")
        let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value).catch((err)=>{
          console.log(err.response.data.message)
          setErrorMsg(err.response.data.message)
        })
       if(req.data.statusMsg =='Success'){
        setFormState(false)

       }
        
      }

     async function verifyResetCode(value){
        let req =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',value).catch((err)=>{
          setErrorMsg(err.response.data.message)
        })
        console.log(req)
        if(req.data.status=="Success"){
          nav('/resetPassword')


        }
      }
    
   
  return (
    <>
     <div className='my-20 mx-auto p-4'>
     {errorMsg?<div class="mt-20 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {errorMsg}
</div>:null}
      

{formState? 
           

           <form>
            <label htmlFor="email" className="block mb-2 text-2xl text-md font-medium text-gray-900 dark:text-white">please enter your verification code :</label>
            <input name='email' placeholder='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email"  id="email"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik.touched.email && formik.errors.email?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div> :null}
            <button  onClick={()=>{ForgetPassword()}} className='text-black border border-black rounded-lg p-3 px-10 mr-0 mt-4 hover:bg-green-400 hover:text-white ' >verify</button>
            </form>
 

             :
            <form onSubmit={formik2.handleSubmit}>
            <label htmlFor="code" className="block mb-2 text-2xl text-md font-medium text-gray-900 dark:text-white">reset your account password :</label>
            <input  placeholder='code' onChange={formik2.handleChange} onBlur={formik2.handleBlur} name='code'  value={formik2.values.resetCode}  type="text"  id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
            {formik2.touched.resetCode&& formik2.errors.resetCode?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik2.errors.resetCode}
            </div> :null}
            <button type='submit' onClick={()=>{}} className='text-black border border-black rounded-lg p-3 px-10 mr-0 mt-4 hover:bg-green-400 hover:text-white ' >verify</button>
            </form>
           
           
 
           }
   
        </div>
       

    </>
  )
}
