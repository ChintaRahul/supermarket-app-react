import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  totalItems: 0,
  totalAmount: 0,
  cartItems: [],
  groceryList: [],
  changed: false,
  showCart: false,
};

const findItemIndex = (itemList, id) => {
  return itemList.findIndex((item) => item.id === id);
};

const findItem = (itemList, id) => {
  return itemList.find((item) => item.id === id);
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      const cartId = action.payload;
      const item = findItem(state.cartItems, cartId);
      const findGroceryItem = findItem(state.groceryList, cartId);
      if (!findGroceryItem) return;
      if (item) {
        item.quantity += 1;
      } else {
        const cartItem = {
          id: cartId,
          quantity: 1,
          amount: findGroceryItem.actualPrice,
        };
        state.cartItems.push(cartItem);
      }
      state.totalAmount += findGroceryItem.actualPrice;
      state.totalItems += 1;
      state.changed = true;
    },
    removeCart(state, action) {
      const cartId = action.payload;
      const itemIndex = findItemIndex(state.cartItems, cartId);
      const findGroceryItem = findItem(state.groceryList, cartId);
      if (!findGroceryItem) return;
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity--;
        if (state.cartItems[itemIndex].quantity < 1) {
          state.cartItems.splice(itemIndex, 1);
        }
        state.totalItems -= 1;
        state.totalAmount -= findGroceryItem.actualPrice;
        state.changed = true;
      }
    },
    replaceCart(state, action) {
      state.groceryList = action.payload.groceryList || [];
      state.groceryList.forEach((item, index, array) => {
        array[index].actualPrice = getDiscountedPrice(
          item.price,
          item.discount
        );
        array[index].id = item["_id"];
      });
      const cart = action.payload.cart || [];
      if (cart.length) {
        state.cartItems = cart[0].cartItems || [];
        state.totalItems = cart[0].totalItems || 0;
        state.totalAmount = cart[0].totalAmount || 0;
        state.id = cart[0]._id;
      }
      state.changed = true;
    },
    resetCart(state) {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.changed = true;
    },
    setCartStatusChanged(state, action) {
      state.changed = action.payload;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

function getDiscountedPrice(price = 0, discountInPercent = 0) {
  return price - Math.floor((price * discountInPercent) / 100);
}

export const cartActions = cartReducer.actions;
export default cartReducer.reducer;
