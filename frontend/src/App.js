import { useEffect } from 'react';
import './App.css';
import Header from "./component/layout/Header.jsx"
import Footer from './component/layout/Footer.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WebFont from "webfontloader"
import Home from './component/Home/Home.jsx';
import ProductDetails from './component/product/ProductDetails.jsx';
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])

  return (
    <>
    <Router>
      <Header/>
     <Routes>
     <Route extact path='/' element={<Home/>}/>
     <Route extact path='/product/:id' element={<ProductDetails/>}/>
     </Routes>
      <Footer/>
    </Router>
    </>
    
  );
}

export default App;
