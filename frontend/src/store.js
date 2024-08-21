import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer } from './reducers/productreducer';
import { productDetailReducer } from './reducers/productreducer';
import { userReducer, profileReducer,forgotPasswordReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { newOrderReducer } from './reducers/orderReducer';
import { myOrdersReducer } from './reducers/orderReducer';
import { orderDetailsReducer } from './reducers/orderReducer';
import { newReviewReducer } from './reducers/productreducer';
import { newProductReducer } from './reducers/productreducer';
import { deleteProductReducer } from './reducers/productreducer';
const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
});
let initialstate = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo :localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }
};
const middleware = [thunk];
const store = createStore(
      reducer,
      initialstate,
      composeWithDevTools(applyMiddleware(...middleware))
    );
export default store