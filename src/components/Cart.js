import React from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/CartReducer";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

export default function Cart() {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const toggleCart = () => dispatch(cartActions.toggleCart());
  const finishCheckout = () => {
    dispatch(cartActions.resetCart());
    dispatch(cartActions.toggleCart())
  };

  const cartDisplay = (cartItems || []).map((item) => (
    <CartItem key={item.id} {...item} />
  ));

  return (
    <Modal onClose={toggleCart}>
      <div className="checkout-cart-container">
        <h3>Review Cart</h3>
        {cartDisplay.length > 0 ? (
          <>
            {cartDisplay}
            <div className={classes["total-amount-container"]}>
              <div className={classes['amount-display']}>
                <h4>Total amount </h4>
                <span
                  className={classes["total-amount"]}
                >{`\u20B9${totalAmount}`}</span>
              </div>
              <button className={`btn ${classes["btn-complete"]}`} onClick={finishCheckout}>
                Finish
              </button>
            </div>
          </>
        ) : (
          <p>No cart items added, please add few items...</p>
        )}
      </div>
    </Modal>
  );
}
