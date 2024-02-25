import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setCurrentIngredientId } from '../../services/slices/current-values';
import { getIngredient } from '../../utils/utils';
import Preloader from '../../components/preloader/preloader';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';


function Ingredient() {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const isVisible = useAppSelector((store) => store.modal.isVisible);

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientsArrStatus = useAppSelector((store) => store.ingredients.status);

  useEffect(() => {
    id && dispatch(setCurrentIngredientId({
      currentIngredientId: id
    }));
  }, [id, dispatch]);

  const requestedIngredient = (id && getIngredient(ingredientsArr, id)) || false;

  return (
    <main className={styles.main}>
      {ingredientsArrStatus === 'loading' && isVisible === false && (
          <Preloader />
      )}

      {ingredientsArrStatus === 'resolved' && !requestedIngredient && (
        <h2 className='text text_type_main-large text_color_inactive'>
          Такого ингредиента к нам не завозили
        </h2>
      )}

      {ingredientsArrStatus === 'resolved' && requestedIngredient && (
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
