import React, { useState } from "react";
import Cart from "./components/Cart/Cart";

import CardButtonContext from "./components/context/cartbutton-context";
import CartProvider from "./components/context/CartProvider";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App(e) {
  const [showCart, setShowCart] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      <CardButtonContext.Provider
        value={{
          showCart: showCartHandler,
          hideCart: hideCartHandler,
        }}
      >
        {showCart && <Cart />}
        <Header />
        <main>
          <Meals />
        </main>
      </CardButtonContext.Provider>
    </CartProvider>
  );
}

export default App;
