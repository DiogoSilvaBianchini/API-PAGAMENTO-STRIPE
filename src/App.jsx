import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import userContext from './context/userContext'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react'
import RegisterProduct from './pages/RegisterProduct/RegisterProduct';
import {useCookies} from 'react-cookie'
import Produtos from './pages/Produtos/Produtos';
import Cart from './pages/Cart/Cart';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise  = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function App() {
  const [token, setToken] = useState("")
  const [bodyTemp, setBodyTemp] = useState("")
  const [cookie, setCookie] = useCookies('token')
  const [cart, setCart] = useState([])
  const [clientSecret, setClientScret] = useState("")
  
  useEffect(() => {
    if(cookie.token && !token){
      setToken(cookie.token)
    }
  }, [cookie, token])

  return (
    <>
      <userContext.Provider value={{token, setToken, bodyTemp, setBodyTemp, cookie, setCookie, cart, setCart, setClientScret}}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_KEY_GOOGLE_PUBLIC}>
          <BrowserRouter>
            <Header auth={token}/>
            {
              clientSecret ? (
                <Elements options={{clientSecret, theme: "stripe", loader: "auto"}} stripe={stripePromise}>
                  <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path='/checkout'/>
                    <Route path='/complete'/>
                    <Route path="/productRegister" element={<RegisterProduct />}/>
                    <Route path="/products" element={<Produtos />}/>
                    <Route path="/cart" element={<Cart />}/>
                  </Routes>
                </Elements>
              ): (
                <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/productRegister" element={<RegisterProduct />}/>
                  <Route path="/products" element={<Produtos />}/>
                  <Route path="/cart" element={<Cart />}/>
                </Routes>
              )
            }
          </BrowserRouter>
        </GoogleOAuthProvider>
      </userContext.Provider>
    </>
  )
}

export default App
