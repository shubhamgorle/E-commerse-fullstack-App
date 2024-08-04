import { useEffect, useState } from 'react';
import './App.css';
import Header from "./component/layout/Header.jsx"
import Footer from './component/layout/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WebFont from "webfontloader"
import Home from './component/Home/Home.jsx';
import ProductDetails from './component/product/ProductDetails.jsx';
import Products from './component/product/Products.jsx';
import Search from './component/product/Search.jsx';
import LoginSignup from './component/User/LoginSignup.jsx';
import store from "./store.js"
import { loadUser } from './actions/userActions.js';
import UserOption from './component/layout/Header/UserOption.jsx';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.jsx';
// import ProtectedRoute from './component/Route/ProtectedRoute.jsx';
import UpdatedProfile from './component/User/UpdatedProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword.jsx';
import ForgotPassword from './component/User/ForgotPassword.jsx';
import ResetPassword from './component/User/ResetPassword.jsx';
import Cart from './component/Cart/Cart.jsx';
import Shipping from './component/Cart/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx';
import axios from 'axios';
import Payment from './component/Cart/Payment.jsx';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"


function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>
          <Route extact path='/' element={<Home />} />
          <Route extact path='/product/:id' element={<ProductDetails />} />
          <Route extact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route extact path='/search' element={<Search />} />
          <Route extact path='/account' element={isAuthenticated &&<Profile/>} />
          <Route extact path='/login' element={<LoginSignup />} />
          <Route extact path='/me/update' element={isAuthenticated &&<UpdatedProfile/>} />
          <Route extact path='/password/update' element={isAuthenticated && <UpdatePassword/>} />
          <Route extact path='/password/forgot' element={<ForgotPassword/>}/>
          <Route extact path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route extact path='/cart' element={<Cart/>}/>
          <Route extact path='/shipping' element={isAuthenticated && <Shipping/>} />
          <Route extact path='/order/confirm' element={isAuthenticated && <ConfirmOrder/>} />
          {
            stripeApiKey && <Route extact path='/process/payment' element={isAuthenticated && <Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} />
          }
         
        </Routes>
        <Footer />
      </Router>
    </>

  );
}

export default App;
