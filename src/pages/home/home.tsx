import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/useAppSelector';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Preloader from '../../components/preloader/preloader';
import styles from './home.module.css';


function Home() {
  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);
  const ingredientsArrStatus = useAppSelector((store) => store.ingredients.status);

  return (
    <>
      {ingredientsArrStatus === 'loading' && (
        <Preloader />
      )}

      {ingredientsArrStatus === 'rejected' && (
        <main className='centeredContainer'>
          <h2 className='text text_type_main-medium text_color_inactive'>
            Ошибка загрузки данных
          </h2>

          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </Button>
        </main>
      )}

      {ingredientsArrStatus === 'resolved' && ingredientsArr.length > 0 && (
        <main className={styles.main}>
          <div className={styles.wrap}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </main>
      )}
    </>
  );
}

export default Home;
