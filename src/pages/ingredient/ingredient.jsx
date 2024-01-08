import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import { SET_CURRENT_INGREDIENT_ID } from '../../services/actions/ingredient-details';
import { getIngredient } from '../../utils/utils';
import Preloader from '../../components/preloader/preloader';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';


function Ingredient() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data, itemsSuccess, itemsRequest, itemsFailed } = useSelector((store) => store.ingredientsReducer);

  useEffect(() => {
    if (!itemsSuccess) {
      dispatch(fetchGetIngredients());
    }

    dispatch({
      type: SET_CURRENT_INGREDIENT_ID,
      payload: {
        id: id
      }
    });
  }, [itemsSuccess, id, dispatch]);

  const requestedIngredient = getIngredient(data, id) || false;

  return (
    <main className={styles.main}>
      {itemsRequest && (
          <Preloader />
      )}

      {!itemsRequest && data.length && !requestedIngredient && (
        <h2 className='text text_type_main-large text_color_inactive'>
          Такого ингредиента к нам не завозили
        </h2>
      )}

      {!itemsRequest && !itemsFailed && data.length && requestedIngredient && (
        <>
          <h1 className={`${styles.title} text text_type_main-large`}>
            Детали ингредиента
          </h1>

          <IngredientDetails />
        </>
      )}
    </main>
  );
}

export default Ingredient;
