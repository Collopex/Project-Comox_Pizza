import styles from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Delicious Meals, Delivered To You </h2>
      <p>
        Choose your favorite meals from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our Meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced italian chefs!
      </p>
    </section>
  );
};
export default MealsSummary;
