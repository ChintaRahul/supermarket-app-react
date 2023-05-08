import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import GroceryList from "./components/GroceryList";
import HomeCart from "./components/HomeCart";
import { useEffect } from "react";
import { fetchCartData } from "./store/Cart-Actions";
import Cart from "./components/Cart";

function App() {
  const showCart = useSelector((state) => state.cart.showCart);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  return (
    <div className="App">
        <div className="title-container">
          <h1>ShopMarket App</h1>
          <HomeCart />
        </div>
        <div>
          {showCart && <Cart />}
          <GroceryList />
        </div>
    </div>
  );
}

export default App;
