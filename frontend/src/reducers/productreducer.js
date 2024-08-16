import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS
} from "../constatnce/productConstant";

export const productReducer = ((state = { products: [] }, action) => {
    if (action.type === ALL_PRODUCT_REQUEST || action.type === ADMIN_PRODUCT_REQUEST ) {
        return {
            loading: true,
            products: []
        }
    }
    else if (action.type === ALL_PRODUCT_SUCCESS) {
        return {
            loading: false,
            products: action.payload.products,
            productsCount: action.payload.productsCount,
            resultPerPage: action.payload.resultPerPage,
            filterdProductCount: action.payload.filterdProductCount
        }
    }
    else if(action.type === ADMIN_PRODUCT_SUCCESS){
        return{
            loading: false,
            products:action.payload
        }
    }
    else if (action.type === ALL_PRODUCT_FAIL || action.type === ADMIN_PRODUCT_FAIL) {
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

export const newReviewReducer = ((state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading:false,
                success: false
            }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }
        default: 
            return state
    }
})