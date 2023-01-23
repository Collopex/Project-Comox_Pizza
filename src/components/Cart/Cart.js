import React, { useContext, useState, Fragment } from "react";

import CardButtonContext from "../context/cartbutton-context";
import CartContext from "../context/cart-context";
import CartItem from "../Cart/CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmittingToDatabase, setIsSubmittingToDatabase] = useState(false);
  const [sendedSuccessfully, setSendedSuccessfully] = useState(false);
  const ButtonClickEvent = useContext(CardButtonContext);
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmittingToDatabase(true);
    await fetch(
      "https://comoxpizz-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmittingToDatabase(false);
    setSendedSuccessfully(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button
        className={styles["button--alt"]}
        onClick={ButtonClickEvent.hideCart}
      >
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>

      {isCheckout && <Checkout onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingToDatabaseModalContent = <p>Sending ordered items...</p>;
  const sendedSuccessfullyModalContent = (
    <Fragment>
      <p> Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={ButtonClickEvent.hideCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal>
      {!isSubmittingToDatabase && !sendedSuccessfully && cartModalContent}
      {isSubmittingToDatabase && isSubmittingToDatabaseModalContent}
      {!isSubmittingToDatabase &&
        sendedSuccessfully &&
        sendedSuccessfullyModalContent}
    </Modal>
  );
};

export default Cart;
