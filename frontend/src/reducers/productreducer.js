import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS
} from "../constatnce/productConstant";

export const productReducer = ((state = { products: [] }, action) => {
    if (action.type === ALL_PRODUCT_REQUEST) {
        return {
            loading: true,
            products: []
        }
    }
    else if (action.type === ALL_PRODUCT_SUCCESS) {
        return {
            loading: false,
            products: action.payload.products,
            productsCount: action.payload.productsCount
        }
    }
    else if (action.type === ALL_PRODUCT_FAIL) {
        return {
            loading: false,
            error: action.payload
        }
    }
    else if (action.type === CLEAR_ERRORS) {
        return {
            ...state,
            error: null
        }
    }
    else {
        return state
    }
})



export const productDetailReducer = ((state = { product: {} }, action) => {
    if (action.type === PRODUCT_DETAIL_REQUEST) {
        return {
            loading: true,
            ...state
        }
    }
    else if (action.type === PRODUCT_DETAIL_SUCCESS) {
        return {
            loading: false,
            product: action.payload,
        }
    }
    else if (action.type === PRODUCT_DETAIL_FAIL) {
        return {
            loading: false,
            error: action.payload
        }
    }
    else if (action.type === CLEAR_ERRORS) {
        return {
            ...state,
            error: null
        }
    }
    else {
        return state
    }
})