import { ADD_TO_CART } from "../constatnce/cartConstants";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  console.log(id, "id")
      const { data } = await axios.get(`/api/v1/products/${id}`);
      console.log(data, "data")
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