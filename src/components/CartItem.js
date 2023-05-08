import React from 'react'
import classes from './CartItem.module.css';
import { useSelector } from 'react-redux';
import ItemAddButton from './ItemAddButton';

export default function CartItem(props) {
  const {id, quantity, amount} = props;
  const groceryList = useSelector(state => state.cart.groceryList);
  const groceryItem = groceryList.find(item => item.id === id);

  if(!groceryItem) return(null);

  const salesPrice = amount * quantity;
  const actualPrice = groceryItem.price * quantity;
  return (
    <div className={classes['cart-item']}>
        <img className={classes['cart-img']} alt='cart item' src={groceryItem.imgUrl}/>
        <div className={classes.container}>
            <span>{groceryItem.name}</span>
            <div className={classes['quanity-display']}><ItemAddButton id={id} /></div>
        </div>
        <div className={`${classes.container} ${classes['item-price']}`}>
            <span>{`\u20B9${salesPrice}`}</span>
            {salesPrice !== actualPrice ? <span><s>{`\u20B9${actualPrice}`}</s></span> : null}
        </div>
    </div>
  )
}
