import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';


function IngredientDetails({ ingredient }) {
  return (
    <section className={`${styles.description} pb-15`}>
      <div className={styles.wrap}>
        <img className={`${styles.image} pb-4`} src={ingredient.image_large} alt={`${ingredient.name}.`} title={ingredient.name} />
        <h4 className={`${styles.header} text text_type_main-medium pb-8`}>{ingredient.name}</h4>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}


IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired
}

export default IngredientDetails;
