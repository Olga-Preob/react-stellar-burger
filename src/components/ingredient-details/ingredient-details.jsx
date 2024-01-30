import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_INGREDIENT_ID } from '../../services/actions/current-values';
import { getIngredient } from '../../utils/utils';
import styles from './ingredient-details.module.css';


function IngredientDetails() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredientId = useSelector((store) => store.currentValuesReducer.currentIngredientId);

  useEffect(() => {
    currentIngredientId !== id && dispatch({
      type: SET_CURRENT_INGREDIENT_ID,
      payload: {
        currentIngredientId: id
      }
    });
  }, [currentIngredientId, id, dispatch]);

  const ingredient = getIngredient(ingredientsArr, currentIngredientId);

  return ingredient && (
    <div className={styles.wrap}>
      {ingredient.image_large || ingredient.image ?
        (
          <img
            className={`${styles.image} pb-4`}
            src={ingredient.image_large || ingredient.image}
            alt={`${ingredient.name}.`}
            title={ingredient.name}
          />
        ):
        (
          <div className={`${styles.image} pb-4`}></div>
        )
      }

      <h1 className={`${styles.header} text text_type_main-medium pb-8`}>
        {
          ingredient.name ? ingredient.name : ''
        }
      </h1>

      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredient.calories ? ingredient.calories : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredient.proteins ? ingredient.proteins : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredient.fat ? ingredient.fat : null
            }
          </p>
        </li>

        <li className={styles.item}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.text} text text_type_digits-default text_color_inactive`}>
            {
              ingredient.carbohydrates ? ingredient.carbohydrates : null
            }
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
