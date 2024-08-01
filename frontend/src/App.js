import { useEffect } from 'react';
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
import ProtectedRoute from './component/Route/ProtectedRoute.jsx';
import UpdatedProfile from './component/User/UpdatedProfile.jsx';
import UpdatePassword from './component/User/UpdatePassword.jsx';
import ForgotPassword from './component/User/ForgotPassword.jsx';
import ResetPassword from './component/User/ResetPassword.jsx';
import Cart from './component/Cart/Cart.jsx';
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser())
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
          <Route extact path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route extact path='/login' element={<LoginSignup />} />
          <Route extact path='/me/update' element={<ProtectedRoute><UpdatedProfile/></ProtectedRoute>} />
          <Route extact path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />
          <Route extact path='/password/forgot' element={<ForgotPassword/>}/>
          <Route extact path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route extact path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer />
      </Router>
    </>

  );
}

export default App;
