import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import TokenContextProvider from './Context/TokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import WishContextProvider from './Context/wishContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
 <WishContextProvider>
  <CartContextProvider>
    <TokenContextProvider>
    
   <App />
 
  </TokenContextProvider>,

  </CartContextProvider>
  </WishContextProvider>
   </StrictMode>
  
 
  
)
