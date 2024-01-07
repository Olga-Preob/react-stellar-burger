import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Preloader from '../../components/preloader/preloader';
import styles from './home.module.css';


function Home() {
  const dispatch = useDispatch();

  const { data, itemsSuccess, itemsRequest, itemsFailed } = useSelector((store) => store.ingredientsReducer);

  useEffect(() => {
    if (!itemsSuccess) {
      dispatch(fetchGetIngredients());
    }
  }, [itemsSuccess, dispatch]);

  return (
    <main className={styles.main}>
      <div className={styles.wrap}>
        {itemsRequest && !itemsFailed && (
          <Preloader />
        )}

        {!itemsRequest && itemsFailed && (
          <h2 className={`text text_type_main-large text_color_inactive`}>
            Ошибка загрузки
          </h2>
        )}

        {!itemsRequest && !itemsFailed && itemsSuccess && data.length && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
          )}
      </div>
    </main>
  );
}

export default Home;
