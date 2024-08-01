import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./productDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails } from '../../actions/productaction'
import { useParams } from "react-router-dom"
import ReviewCard from './ReviewCard'
import ReactStars from "react-rating-stars-component"
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import Metadata from '../layout/Metadata';
import { addItemsToCart } from '../../actions/cartAction'
const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { id } = useParams();
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    const [quantity, setQuantity] = useState(1)
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return
        }
        const qty = quantity - 1;
        setQuantity(qty)
    }
    const increaseQuantity = () => {
        if (product.stock <= quantity) {
            return
        }
        const qty = quantity + 1;
        setQuantity(qty)
    }
    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id, quantity))
        alert.success("Item Added To Cart");
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, alert, error])
    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
                    <Fragment>
                        <Metadata title={`${product.name} -- ECOMMERCE`} />

                        <div className="ProductDetails">
                            <div>
                                <Carousel>
                                    {
                                        product.Images &&
                                        product.Images.map((item, idx) => (
                                            <img
                                                className="CarouselImage"
                                                key={idx}
                                                src={item.url}
                                                alt={`${idx} slide`}
                                            />
                                        ))}
                                </Carousel>
                            </div>

                            <div>
                                <div className='detailsBlock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>

                                <div className='detailsBlock-2'>
                                    <ReactStars {...options} />
                                    <span>({product.numOfReviews}) Reviews</span>
                                </div>

                                <div className='detailsBlock-3'>
                                    <h1><span>&#8377;</span>{product.price}</h1>
                                    <div className='detailsBlock-3-1'>
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input type="number" readOnly value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button onClick={addToCartHandler}>Ad to Cart</button>
                                    </div>

                                    <p>
                                        Status:
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>

                                </div>

                                <div className='detailsBlock-4'>
                                    Discription : <p>{product.description}</p>
                                </div>
                                <button className='submitReviews'>Submit Reviews</button>
                            </div>
                        </div>

                        <h3 className='reviewsHeading'>REVIEWS</h3>
                        {
                            product.reviews && product.reviews[0] ? (
                                <div className='reviews'>
                                    {
                                        product.reviews.map((review) => <ReviewCard review={review} />)
                                    }
                                </div>
                            ) : (
                                <p className='noReviews'>No Reviews Yet</p>
                            )
                        }
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default ProductDetails
