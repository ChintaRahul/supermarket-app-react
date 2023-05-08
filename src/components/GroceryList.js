import React, { useEffect, memo } from "react";
import GroceryItem from "./GroceryItem";
import classes from "./GroceryList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendCartData } from "../store/Cart-Actions";

let initialLoad = true;

export default memo(function GroceryList() {
  const cart = useSelector((state) => state.cart);
  const groceryItem = cart?.groceryList;
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);  

  const groceryItemList =
    (groceryItem || []).length > 0 ? (
      <div className={classes["grocery-list-container"]}>
        {groceryItem.map((groceryItem) => (
          <GroceryItem key={groceryItem._id} {...groceryItem} />
        ))}
      </div>
    ) : (
      <div >There are no items available.</div>
    );

  return <>{groceryItemList}</>;
});
