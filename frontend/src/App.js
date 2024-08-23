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
import OrderSuccess from './component/Cart/OrderSuccess.jsx';
import MyOrders from './component/Orders/MyOrders.jsx';
import OrderDetails from './component/Orders/OrderDetails.jsx';
import DashBoard from './component/admin/DashBoard.jsx';
import ProductsList from './component/admin/ProductsList.jsx';
import NewProduct from './component/admin/NewProduct.jsx';
import UpdateProduct from './component/admin/UpdateProduct.jsx';
import OrdersList from './component/admin/OrdersList.jsx';
import ProcessOrder from './component/admin/ProcessOrder.jsx';
import UsersList from './component/admin/UsersList.jsx';
import UpdateUser from './component/admin/UpdateUser.jsx';
import ProductReviews from './component/admin/ProductReviews.jsx';
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey(){
    try {
      const {data} = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.log(error)
    }
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
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/account' element={isAuthenticated && <Profile/>} />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/me/update' element={isAuthenticated && <UpdatedProfile/>} />
          <Route exact path='/password/update' element={isAuthenticated && <UpdatePassword/>} />
          <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
          <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/shipping' element={isAuthenticated && <Shipping/>} />
          {
            stripeApiKey && <Route exact path='/process/payment' element={isAuthenticated && <Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} />
          }
          <Route exact path='/success' element={isAuthenticated && <OrderSuccess/>}/>
          <Route exact path='/orders' element={isAuthenticated && <MyOrders/>} />
          <Route exact path='/order/confirm' element={isAuthenticated && <ConfirmOrder/>}/>
          <Route exact path='/order/:id' element={isAuthenticated && <OrderDetails/>}/>
          {/* admin routed need to be ptotected as isAdmin---> i will handle it later */}
          <Route exact path='/admin/dashboard' element={isAuthenticated && <DashBoard/>}/>
          <Route exact path='/admin/products' element={isAuthenticated && <ProductsList/>}/>
          <Route exact path='/admin/product' element={isAuthenticated && <NewProduct/>}/>
          <Route exact path='/admin/product/:id' element={isAuthenticated && <UpdateProduct/>}/>
          <Route exact path='/admin/orders' element={isAuthenticated && <OrdersList/>}/>
          <Route exact path='/admin/order/:id' element={isAuthenticated && <ProcessOrder/>}/>
          <Route exact path='/admin/users' element={isAuthenticated && <UsersList/>}/> 
          <Route exact path='/admin/user/:id' element={isAuthenticated && <UpdateUser/>}/>
          <Route exact path='/admin/reviews' element={isAuthenticated && <ProductReviews/>}/>
          </Routes>
        <Footer />
      </Router>
    </>

  );
}

export default App;
