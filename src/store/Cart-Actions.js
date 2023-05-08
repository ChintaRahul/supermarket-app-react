import { cartActions } from "./CartReducer";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3002/grocery-list");
      if (!response.ok) {
        throw new Error("Failed while fetch cart data");
      }
      return response.json();
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      console.error(error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3002/cart-items", {
        method: "POST",
        body: JSON.stringify({
          cartItems: cart.cartItems,
          totalAmount: cart.totalAmount,
          totalItems: cart.totalItems,
          _id: cart.id
        }),
        headers: {
          "Content-Type": "application/json",
        }        
      });

      if (!response.ok) {
        throw new Error("failed sending cart data");
      }
    };
    try {
      await sendRequest();
      dispatch(cartActions.setCartStatusChanged(false));
    } catch (error) {
      console.error(error);
    }
  };
};
