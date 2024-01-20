import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredient } from '../../utils/utils';
import styles from './ingredient-details.module.css';


function IngredientDetails() {
  const { id } = useParams();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredientId = useSelector((store) => store.currentValuesReducer.currentIngredientId);

  const ingredientId = getIngredient(ingredientsArr, currentIngredientId ? currentIngredientId : id);

  return ingredientId && (
    <div className={styles.wrap}>
      {ingredientId.image_large || ingredientId.image ?
        (
          <img
            className={`${styles.image} pb-4`}
            src={ingredientId.image_large || ingredientId.image}
            alt={`${ingredientId.name}.`}
            title={ingredientId.name}
          />
        ):
        (
          <div className={`${styles.image} pb-4`}></div>
        )
      }

      <h1 className={`${styles.header} text text_type_main-medium pb-8`}>
        {
          ingredientId.name ? ingredientId.name : ''
        }
      </h1>

      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredientId.calories ? ingredientId.calories : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredientId.proteins ? ingredientId.proteins : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredientId.fat ? ingredientId.fat : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredientId.carbohydrates ? ingredientId.carbohydrates : null
            }
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
