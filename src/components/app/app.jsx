import { useState, useEffect, useReducer } from 'react';
import { getIngredients, createOrder } from '../../utils/burger-api';
import { ingredientsContext, BurgerInfoContext } from '../../services/app-context';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';


const initialTotalPriceState = { totalPrice: 0 };

function totalPriceReducer(state, items) {
  const bunPrice = items.bun ? Number(items.bun.price * 2) : 0;
  const fillingPrice = Number(items.ingredients.reduce((previousValue, ingredient) => previousValue + ingredient.price, 0));
  const newTotalPrice = Number(bunPrice + fillingPrice);

  return { totalPrice: newTotalPrice };
}

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [ingredients, setIngredients] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [orderСomposition, setOrderСomposition] = useState({
    bun: null,
    ingredients: []
  });
  const [totalPriceState, totalPriceDispatch] = useReducer(totalPriceReducer, initialTotalPriceState);

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
      hasError: false
    });

    getIngredients()
      .then((data) => {
        console.log(data);
        setIngredients(Object.assign([], data.data));
        setOrderСomposition({
          ...orderСomposition,
          bun: data.data.filter((ingredient) => ingredient.type === 'bun')[0],
          ingredients: data.data.filter((ingredient) => (ingredient.type === 'sauce' || ingredient.type === 'main')).slice(12, 13)
        });
      })
      .catch((err) => {
        console.error(err);
        setState({
          ...state,
          hasError: true
        });
      })
      .finally(() => {
        setState({
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
        ingredients.length &&
        (
          <div className={styles.wrap}>
            <ingredientsContext.Provider value={{ ingredients, setIngredients }}>
              <BurgerInfoContext.Provider value={{
                orderСomposition,
                setOrderСomposition,
                totalPriceState,
                totalPriceDispatch,
                orderData,
                setOrderData,
                createOrder
              }}>
                <BurgerIngredients />
                <BurgerConstructor />
              </BurgerInfoContext.Provider>
            </ingredientsContext.Provider>
          </div>
        )
      }
      </main>
    </div>
  );
}

export default App;
