import { useState, useEffect, useContext } from 'react';
import { useInView } from 'react-intersection-observer'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsDataContext } from '../../services/app-context';
import IngredientsGroup from './ingredients-group/ingredients-group';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal';
import styles from './burger-ingredients.module.css';


function BurgerIngredients() {
  const inViewOptions = {
    threshold: 0.2,
    trackVisibility: true,
    delay: 100
  };

  const { ingredientsData } = useContext(IngredientsDataContext);

  const [current, setCurrent] = useState('bun');
  const [ingredientId, setIngredientId] = useState();

  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);

  const ingredientInfoModal = useModal(false);

  const bun = ingredientsData.filter((ingredient) => ingredient.type === 'bun');
  const sauce = ingredientsData.filter((ingredient) => ingredient.type === 'sauce');
  const main = ingredientsData.filter((ingredient) => ingredient.type === 'main');

  useEffect(() => {
    if (inViewBun) {
      setCurrent('bun');
    }
    else if (inViewMain) {
      setCurrent('main');
    }
    else if (inViewSauce) {
      setCurrent('sauce');
    }
  }, [inViewBun, inViewMain, inViewSauce]);

  const setTab = (tabName) => {
    setCurrent(tabName);
    document.getElementById(tabName).scrollIntoView({ behavior: 'smooth' });
  }

  const onClickHandler = () => {
    ingredientInfoModal.onOpen();
  }

  return (
    <>
      <section className={styles.burgerIngredients}>
        <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
        <div className={`${styles.tabs} pb-10`}>
          <Tab value='bun' active={current === 'bun'} onClick={() => setTab('bun')}>
            Булки
          </Tab>
          <Tab value='sauce' active={current === 'sauce'} onClick={() => setTab('sauce')}>
            Соусы
          </Tab>
          <Tab value='main' active={current === 'main'} onClick={() => setTab('main')}>
            Начинки
          </Tab>
        </div>

        <div className={`${styles.groups} custom-scroll`}>
          <IngredientsGroup
            ref={bunRef}
            heading='Булки'
            groupId='bun'
            setIngredientId={setIngredientId}
            onClick={onClickHandler}
            ingredients={bun}
          />
          <IngredientsGroup
            ref={sauceRef}
            heading='Соусы'
            groupId='sauce'
            setIngredientId={setIngredientId}
            onClick={onClickHandler}
            ingredients={sauce}
          />
          <IngredientsGroup
            ref={mainRef}
            heading='Начинки'
            groupId='main'
            setIngredientId={setIngredientId}
            onClick={onClickHandler}
            ingredients={main}
          />
        </div>
      </section>

      {
        <Modal
          header='Детали ингредиента'
          isModalOpen={ingredientInfoModal.isModalOpen}
          closeModal={() => ingredientInfoModal.onClose()}
        >
          {
            ingredientId &&
              <IngredientDetails ingredient={ingredientsData.find((ingredient) => ingredient._id === ingredientId)} />
          }
        </Modal>
      }
    </>
  );
}

export default BurgerIngredients;
