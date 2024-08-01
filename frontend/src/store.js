import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer } from './reducers/productreducer';
import { productDetailReducer } from './reducers/productreducer';
import { userReducer, profileReducer,forgotPasswordReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer
});
let initialstate = {
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    }
};
const middleware = [thunk];
const store = createStore(
      reducer,
      initialstate,
      composeWithDevTools(applyMiddleware(...middleware))
    );
export default store