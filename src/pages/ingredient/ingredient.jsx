import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import { SET_CURRENT_INGREDIENT_ID } from '../../services/actions/current-values';
import { getIngredient } from '../../utils/utils';
import Preloader from '../../components/preloader/preloader';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';


function Ingredient() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const ingredientsArr = useSelector((store) => store.ingredientsReducer.ingredients);
  const isRequest = useSelector((store) => store.ingredientsReducer.isRequest);
  const isFailed = useSelector((store) => store.ingredientsReducer.isFailed);

  useEffect(() => {
    ingredientsArr.length === 0 && dispatch(fetchGetIngredients());

    dispatch({
      type: SET_CURRENT_INGREDIENT_ID,
      payload: {
        currentIngredientId: id
      }
    });
  }, [ingredientsArr, id, dispatch]);

  const requestedIngredient = getIngredient(ingredientsArr, id) || false;

  return (
    <main className={styles.main}>
      {isRequest && (
          <Preloader />
      )}

      {!isRequest && ingredientsArr.length && !requestedIngredient && (
        <h2 className='text text_type_main-large text_color_inactive'>
          Такого ингредиента к нам не завозили
        </h2>
      )}

      {!isRequest && !isFailed && ingredientsArr.length && requestedIngredient && (
        <>
          <p className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </p>

          <IngredientDetails />
        </>
      )}
    </main>
  );
}

export default Ingredient;
