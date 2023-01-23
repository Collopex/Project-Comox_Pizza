import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import CardButtonContext from "../context/cartbutton-context";

import styles from "./Modal.module.css";

const Backdrop = (props) => {
  const ButtonClickEvent = useContext(CardButtonContext);
  return (
    <div className={styles.backdrop} onClick={ButtonClickEvent.hideCart} />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
