import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()



export default function CartContextProvider(props){
  const[noOfCartItems,setNoOfCartItems]=  useState(0)
  const[totalPrice,settotalPrice]=  useState(0)
  


    let headers ={
        token : localStorage.getItem("userToken")
    }


   async function addProductToCart(productId){
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            productId 
        },{
            headers}).then((response)=>{
                console.log(response.data.data.totalCartPrice);
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
            settotalPrice(response.data.data.totalCartPrice)
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
    }








    return <CartContext.Provider value={{clearCart,totalPrice,noOfCartItems, updateCartItem,addProductToCart,getCartProduct,deleteProduct}}>

{props.children}

    </CartContext.Provider>
}