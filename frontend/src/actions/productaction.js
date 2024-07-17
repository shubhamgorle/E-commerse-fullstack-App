import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS
} from "../constatnce/productConstant";
import axios from 'axios'
export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let data = await axios.get("/api/v1/products");
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error
        })
    }
}

// clearing errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        let data = await axios.get(`/api/v1/products/${id}`);
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data.data.product
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error
        })
    }
}