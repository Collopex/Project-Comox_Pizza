import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import styles from "./Header.module.css";

const Header = (e) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1> Comox Restaurant </h1>
        <HeaderCartButton />
      </header>
      <div className={styles["main-image"]}>
        <img
          key={mealsImage}
          src={mealsImage}
          alt="Heavenly Baked, Hellishly Good"
        />
      </div>
    </Fragment>
  );
};

export default Header;
