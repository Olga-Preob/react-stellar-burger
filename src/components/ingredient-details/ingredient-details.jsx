import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';


function IngredientDetails() {
  const currentIngredient = useSelector((state) => state.ingredientDetailsReducer.currentIngredient);

  return (
    <section className={`${styles.description} pb-15`}>
      <div className={styles.wrap}>
        {
          currentIngredient.image_large ?
          (
            <img className={`${styles.image} pb-4`} src={currentIngredient.image_large} alt={`${currentIngredient.name}.`} title={currentIngredient.name} />
          ):
          (
            <div className={`${styles.image} pb-4`}></div>
          )
        }
        <h4 className={`${styles.header} text text_type_main-medium pb-8`}>
          {
            currentIngredient.name ? currentIngredient.name : ''
          }
        </h4>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
              {
                currentIngredient.calories ? currentIngredient.calories : null
              }
            </p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
              {
                currentIngredient.proteins ? currentIngredient.proteins : null
              }
            </p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
              {
                currentIngredient.fat ? currentIngredient.fat : null
              }
            </p>
          </li>
          <li className={styles.item}>
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
            <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>{currentIngredient.carbohydrates}
              {
                currentIngredient.carbohydrates ? currentIngredient.carbohydrates : null
              }
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default IngredientDetails;
