import { useState, useEffect, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useInView } from 'react-intersection-observer'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsByCategory } from '../../services/types';
import { Ingredient } from '../../services/types/data';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';


function BurgerIngredients() {
  const inViewOptions = {
    threshold: 0.2,
    trackVisibility: true,
    delay: 100
  };

  const ingredientsArr = useAppSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = useState<string>('bun');

  const [bunRef, inViewBun] = useInView(inViewOptions);
  const [mainRef, inViewMain] = useInView(inViewOptions);
  const [sauceRef, inViewSauce] = useInView(inViewOptions);

  const bun = useMemo<Ingredient[]>(() => {
    return ingredientsArr.filter((ingredient) => ingredient.type === 'bun');
    },
    [ingredientsArr]
  );
  const sauce = useMemo<Ingredient[]>(() => {
    return ingredientsArr.filter((ingredient) => ingredient.type === 'sauce');
    },
    [ingredientsArr]
  );
  const main = useMemo<Ingredient[]>(() => {
    return ingredientsArr.filter((ingredient) => ingredient.type === 'main');
    },
    [ingredientsArr]
  );

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

  const setTab = (tabName: IngredientsByCategory) => {
    const tabNameElement = document.getElementById(tabName);

    setCurrent(tabName);

    tabNameElement && tabNameElement.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={styles.burgerIngredients}>
      <h1 className='text text_type_main-large pt-10'>Соберите бургер</h1>
      <div className={styles.tabs}>
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
          ingredients={bun}
        />
        <IngredientsGroup
          ref={sauceRef}
          heading='Соусы'
          groupId='sauce'
          ingredients={sauce}
        />
        <IngredientsGroup
          ref={mainRef}
          heading='Начинки'
          groupId='main'
          ingredients={main}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
