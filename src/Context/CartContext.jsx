import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export let CartContext = createContext()



export default function CartContextProvider(props){
  const[noOfCartItems,setNoOfCartItems]=  useState(0)
  const[totalPrice,settotalPrice]=  useState(0)
  const[cartId,setCartId]=  useState(null)
  
   

  


    let headers ={
        token : localStorage.getItem("userToken")
    }


   async function addProductToCart(productId){
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId 
        },{
            headers}).then((response)=>{
                console.log(response.data.data._id,"Id");
                setCartId(response.data.data._id)
                settotalPrice(response.data.data.totalCartPrice)
                setNoOfCartItems(response.data.numOfCartItems)

                toast.success(response.data.message)
                return response;
                
            }).catch((error)=>
            {
                console.log(error);
                toast.error(response.data.message)
                return error;
            })
    }


    async function getCartProduct() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers
        }).then((response)=>{
            console.log(response);
            setCartId(response.data.data._id)
            setNoOfCartItems(response.data.numOfCartItems)
            settotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }


    async function deleteProduct(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((response)=>{
            console.log(response);
            setNoOfCartItems(response.data.numOfCartItems)
            settotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }

    async function clearCart(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=>{
            console.log(response);
            settotalPrice(0)
            setNoOfCartItems(0)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }
    async function updateCartItem(productId, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
           count
        },{
            headers
        }).then((response)=>{
            console.log(response);
            setCartId(response.data.data._id)
            settotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
    }


    async function onlinePayment(shippingAddress) {
        
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
            shippingAddress 
        },{
            headers
        }).then((response)=>{
            // console.log(response.data.session.url);
           
            window.location.href = response.data.session.url;
            setNoOfCartItems(0)
            settotalPrice(0)
            return response;
        }).catch((error)=>{
            // console.log(error);
            return error
        })  
    }

  







    return <CartContext.Provider value={{clearCart,onlinePayment,totalPrice,noOfCartItems, updateCartItem,addProductToCart,getCartProduct,deleteProduct}}>

{props.children}

    </CartContext.Provider>
}