import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import "./productDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../actions/productaction'
import { useParams } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.productDetails);
    console.log(product)
    const { id } = useParams();
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf: true
    }
    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])
    return (
        <Fragment>
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
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>{" "}
                            <button>Ad to Cart</button>
                        </div>

                        <p>
                            Status:{" "}
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
        </Fragment>
    )
}

export default ProductDetails
