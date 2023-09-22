import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fetchGetIngredients } from '../../services/actions/ingredients';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';


function App() {
  const dispatch = useDispatch();

  const { data, itemsRequest, itemsFailed } = useSelector((state) => state.ingredientsReducer);

  useEffect(() => {
    dispatch(fetchGetIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
      <p className={`${styles.message_type_stateInfo} text text_type_main-medium pt-10`}>
          {itemsRequest && 'Загрузка...'}
          {itemsFailed && 'Произошла ошибка :<'}
      </p>
      {
        !itemsRequest &&
        !itemsFailed &&
        data.length &&
        (
          <div className={styles.wrap}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        )
      }
      </main>
    </div>
  );
}

export default App;
