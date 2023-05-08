import React from "react";
import classes from "./ItemAddButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartReducer";

export default function ItemAdd({id}) {
  const cartItemData = useSelector(state => state.cart.cartItems);
  const currentItem = cartItemData.find(item => item.id === id);
  const counter = currentItem?.quantity ?? 0;
  const dispatch = useDispatch();
  const incrementCounter = () => {
    dispatch(cartActions.addCart(id));
  };

  const decrementCounter= () => {
    dispatch(cartActions.removeCart(id));
  };

  const btnContent =
    counter > 0 ? (
      <div className={`btn ${classes["btn-container"]}`}>
        <span
          className={classes["span-counter-btn"]}
          onClick={decrementCounter}
        >
          -
        </span>
        <span>{counter}</span>
        <span
          className={classes["span-counter-btn"]}
          onClick={incrementCounter}
        >
          +
        </span>
      </div>
    ) : (
      <button
        onClick={incrementCounter}
        className={`btn ${classes["btn-add"]}`}
      >
        Add
      </button>
    );

  return <>{btnContent}</>;
}
