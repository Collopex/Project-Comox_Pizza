import { useRef, useState } from "react";

import styles from "./Checkout.module.css";
import CardButtonContext from "../context/cartbutton-context";
import { useContext } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveCharacter = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValditiy] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const ButtonClickEvent = useContext(CardButtonContext);
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveCharacter(enteredPostalCode);

    setFormInputValditiy({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
    // Submit the cart to database
  };

  const nameControlStyles = `${styles.control} ${
    formInputValidity.name ? "" : styles.invalid
  }`;
  const streetControlStyles = `${styles.control} ${
    formInputValidity.street ? "" : styles.invalid
  }`;
  const cityControlStyles = `${styles.control} ${
    formInputValidity.city ? "" : styles.invalid
  }`;
  const postalCodeStyles = `${styles.control} ${
    formInputValidity.postalCode ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlStyles}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInput} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code (5 character long)!</p>
        )}
      </div>
      <div className={postalCodeStyles}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={ButtonClickEvent.hideCart}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
