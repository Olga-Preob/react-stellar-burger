import { useState, useEffect } from 'react';
import { getIngredients } from '../../utils/burger-api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';


function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [ingredientsData, setIngredientsData] = useState([]);

  const bunItem = ingredientsData.filter((ingredient) => ingredient.type === 'bun')[0];
  const fillingItems = ingredientsData.filter((ingredient) => (ingredient.type === 'sauce' || ingredient.type === 'main')).slice(6, 13);

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
      hasError: false
    });

    getIngredients()
      .then((data) => {
        return setIngredientsData(Object.assign([], data.data));
      })
      .catch((err) => {
        console.error(err);
        return setState({
          ...state,
          hasError: true
        });
      })
      .finally(() => {
        return setState({
          ...state,
          isLoading: false
        });
      });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
      <p className={`${styles.message_type_stateInfo} text text_type_main-medium pt-10`}>
          {state.isLoading && 'Загрузка...'}
          {state.hasError && 'Произошла ошибка :<'}
      </p>
      {
        !state.isLoading &&
        !state.hasError &&
        ingredientsData.length &&
        (
          <div className={styles.wrap}>
            <BurgerIngredients ingredients={ingredientsData} />
            <BurgerConstructor bunItem={bunItem} fillingItems={fillingItems} />
          </div>
        )
      }
      </main>
    </div>
  );
}

export default App;
