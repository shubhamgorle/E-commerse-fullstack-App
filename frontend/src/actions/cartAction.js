import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constatnce/cartConstants";
import axios from "axios";

// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
      const { data } = await axios.get(`/api/v1/products/${id}`);
      dispatch({ type: ADD_TO_CART, payload: {
        product:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.Images[0].url,
        stock:data.product.stock,
        quantity
      } });
      localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }


  // Remove from cart

  export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({ 
      type: REMOVE_CART_ITEM, 
      payload: id
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}