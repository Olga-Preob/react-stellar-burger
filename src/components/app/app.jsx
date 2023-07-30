import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import useModal from '../../hooks/useModal';
import Modal from '../modal/modal';
import{ reactModals, dataUrl } from '../../utils/constants';
import styles from './app.module.css';


function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
  });
  const [ingredientsData, setIngredientsData] = useState([]);
  const [ingredientId, setIngredientId] = useState();

  const ingredientInfoModal = useModal(false);
  const orderInfoModal = useModal(false);

  const bunItem = ingredientsData.filter((ingredient) => ingredient.type === 'bun')[0];
  const fillingItems = ingredientsData.filter((ingredient) => (ingredient.type === 'sauce' || ingredient.type === 'main')).slice(6, 13);

  const getIngredientsData = () => {
    fetch(dataUrl)
      .then((res) => {
        setState({
          ...state,
          isLoading: true,
          hasError: false
        });

        if (!res.ok) {
          return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return setIngredientsData(Object.assign([], data.data));
      })
      .catch((err) => {
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
  };

  useEffect(() => {
    getIngredientsData();
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
            <BurgerIngredients
              ingredients={ingredientsData}
              setIngredientId={setIngredientId}
              onClick={() => [ingredientInfoModal.onOpen()]}
            />
            <BurgerConstructor
              bunItem={bunItem}
              fillingItems={fillingItems}
              onClick={() => [orderInfoModal.onOpen()]}
            />
          </div>
        )
      }
      </main>
      {
        <>
          <Modal
            header='Детали ингредиента'
            isModalOpen={ingredientInfoModal.isModalOpen}
            onClose={() => [ingredientInfoModal.onClose()]}
            nodeReactModals={reactModals}
          >
            {
              ingredientId &&
                <IngredientDetails ingredient={ingredientsData.find((ingredient) => ingredient._id === ingredientId)} />
            }
          </Modal>
          <Modal
            header=''
            isModalOpen={orderInfoModal.isModalOpen}
            onClose={() => [orderInfoModal.onClose()]}
            nodeReactModals={reactModals}
          >
            <OrderDetails />
          </Modal>
        </>
      }
    </div>
  );
}

export default App;
