import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productReducer } from './reducers/productreducer';
import { productDetailReducer } from './reducers/productreducer';
const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailReducer
});
let initialstate = {};
const middleware = [thunk];
const store = createStore(
      reducer,
      initialstate,
      composeWithDevTools(applyMiddleware(...middleware))
    );
export default store