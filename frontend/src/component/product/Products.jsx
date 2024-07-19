import React, { Fragment, useEffect } from 'react'
import "./products.css"
import { useSelector, useDispatch } from 'react-redux'
import { getProduct, clearErrors } from '../../actions/productaction'
import Loader from '../layout/loader/Loader'
import ProductCard from '../Home/ProductCard'
const Products = () => {
    const dispatch = useDispatch();
    const {loading, products, error, productCount} = useSelector((state)=>state.products)
    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch])
  return (
    <Fragment>
     {
        loading ? <Loader/> : 
        <Fragment>
         <h2 className='productsHeading'>Products</h2>
         <div className='products'>
         {
            products && products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))
         }
         </div>
        </Fragment>
    }
    </Fragment>
  )
}

export default Products
