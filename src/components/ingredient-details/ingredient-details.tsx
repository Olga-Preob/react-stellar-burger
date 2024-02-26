import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentIngredientId } from '../../services/slices/current-values';
import { getIngredient } from '../../utils/utils';
import styles from './ingredient-details.module.css';


function IngredientDetails() {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);
  const currentIngredientId = useAppSelector((store) => store.currentValues.currentIngredientId);

  useEffect(() => {
    id && currentIngredientId !== id && dispatch(setCurrentIngredientId({
      currentIngredientId: id
    }));
  }, [currentIngredientId, id, dispatch]);

  const ingredient = currentIngredientId ? getIngredient(ingredientsArr, currentIngredientId) : null;

  return ingredient ? (
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
  ) : null;
}

export default IngredientDetails;
