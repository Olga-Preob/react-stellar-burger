import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIngredient } from '../../utils/utils';
import styles from './ingredient-details.module.css';


function IngredientDetails() {
  const { id } = useParams();

  const { data } = useSelector((store) => store.ingredientsReducer);

  const { currentIngredientId } = useSelector((store) => store.ingredientDetailsReducer);

  const currentIngredient = getIngredient(data, currentIngredientId ? currentIngredientId : id);

  return currentIngredient && (
    <div className={styles.wrap}>
      {currentIngredient.image_large || currentIngredient.image ?
        (
          <img
            className={`${styles.image} pb-4`}
            src={currentIngredient.image_large || currentIngredient.image}
            alt={`${currentIngredient.name}.`}
            title={currentIngredient.name}
          />
        ):
        (
          <div className={`${styles.image} pb-4`}></div>
        )
      }

      <h2 className={`${styles.header} text text_type_main-medium pb-8`}>
        {
          currentIngredient.name ? currentIngredient.name : ''
        }
      </h2>

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
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              currentIngredient.carbohydrates ? currentIngredient.carbohydrates : null
            }
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
