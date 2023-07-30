import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';


function BurgerIngredients({ ingredients, setIngredientId, onClick }) {
  const inViewOptions = {
    threshold: 0.2,
    trackVisibility: true,
    delay: 100
  };

  const [current, setCurrent] = useState('bun');
  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);

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

  return (
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
          onClick={onClick}
          ingredients={ingredients.filter((ingredient) => ingredient.type === 'bun')}
        />
        <IngredientsGroup
          ref={sauceRef}
          heading='Соусы'
          groupId='sauce'
          setIngredientId={setIngredientId}
          onClick={onClick}
          ingredients={ingredients.filter((ingredient) => ingredient.type === 'sauce')}
        />
        <IngredientsGroup
          ref={mainRef}
          heading='Начинки'
          groupId='main'
          setIngredientId={setIngredientId}
          onClick={onClick}
          ingredients={ingredients.filter((ingredient) => ingredient.type === 'main')}
        />
      </div>
    </section>
  );
}


BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  setIngredientId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredients;
