import React from "react";
import ItemAddButton from "./ItemAddButton.js";
import classes from "./GroceryItem.module.css";

export default function GroceryItem(props) {
  const { id, name, price, quantity, discount, imgUrl } = props;
  const actualPrice =
    discount > 0 ? (price - Math.floor((price * discount / 100))) : price;

  const displayPrice =
    discount > 0 ? (
      <div className={classes['item-discount-span']}>
        <span>
          <s>{`\u20B9${price}`}</s>
        </span>
        <span>{`\u20B9${actualPrice}`}</span>
      </div>
    ) : (
        <span>{`\u20B9${price}`}</span>
    );

  return (
    <div className={classes["container"]}>
      <div className={classes["img-container"]}>
        <img
          className={classes["item-img"]}
          alt="grocery_item_image"
          src={imgUrl}
        />
      </div>
      <div>
        <span>{name}</span>
      </div>
      <div className={classes["item-quantity"]}>
        <span>{quantity}</span>
      </div>
      <div className={classes["item-price"]}>
        {displayPrice}
        <ItemAddButton id={id} />
      </div>
      {discount ? (
        <div className={classes["item-discount"]}>
          <span>{`${discount}% off`}</span>
        </div>
      ) : null}
    </div>
  );
}
