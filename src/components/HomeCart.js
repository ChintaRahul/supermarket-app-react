import React from "react";
import classes from "./HomeCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartReducer";

export default function HomeCart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const toggleCart = () => dispatch(cartActions.toggleCart());

  const itemPlural = cartItems.totalItems > 1 ? "s" : null;
  return (
    <>
      {cartItems.totalItems > 0 ? (
        <div className={classes["cart-main-container"]}>
          <div className={classes["cart-container"]}>
            <div className={classes["cart-quantity"]}>
              {cartItems.totalItems} item{itemPlural} in cart
            </div>
            <div className={classes["cart-amount"]}>
              <span>{`\u20B9${cartItems.totalAmount}`}</span>
            </div>
          </div>
          <button className={`btn ${classes["btn-cart"]}`} onClick={toggleCart}>
            checkout
          </button>
        </div>
      ) : null}
    </>
  );
}
