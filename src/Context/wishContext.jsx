import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export let WishContext = createContext()



export default function WishContextProvider(props){
  
    let headers ={
        token : localStorage.getItem("userToken")
    }


   async function addProductToWish(productId){
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
            productId 
        },{
            headers}).then((response)=>{
                console.log(response);
               
                toast.success(response.data.message)
                return response;
                
            }).catch((error)=>
            {
                console.log(error);
                toast.error(response.data.message)
                return error;
            })
    }


    async function getWishProduct() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers
        }).then((response)=>{
            console.log(response);
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }


    async function deleteProduct(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((response)=>{
            console.log(response);
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }

    async function clearWish(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        }).then((response)=>{
            console.log(response);
            return response;
        }).catch((error)=>{
            console.log(error);
            return error
        })  
        
    }
  





    return <WishContext.Provider value={{clearWish,addProductToWish,getWishProduct,deleteProduct}}>

{props.children}

    </WishContext.Provider>
}