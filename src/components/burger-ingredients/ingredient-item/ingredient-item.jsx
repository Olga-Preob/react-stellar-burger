import React, { useContext } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerInfoContext } from '../../../services/app-context';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';


function IngredientItem({ ingredient, setIngredientPopup, onClick }) {
  const { orderСomposition, setOrderСomposition } = useContext(BurgerInfoContext);

  const onClickHandler = () => {
    onClick();

    setIngredientPopup(ingredient);

    if (ingredient.type === 'bun') {
      setOrderСomposition({
        ...orderСomposition,
        bun: ingredient
      });
    } else {
      const newIngredientsArr = Object.assign([], orderСomposition.ingredients);
      newIngredientsArr.push(ingredient);
      setOrderСomposition({
        ...orderСomposition,
        ingredients: newIngredientsArr
      });
    }
  }

  return (
    <li className={styles.item} onClick={onClickHandler}>
      <Counter count={ingredient.__v} size='default' />
      <img className={`${styles.image} pb-1`} src={ingredient.image} alt={`${ingredient.name}.`} title={ingredient.name} />
      <div className={`${styles.price} pb-1`}>
        <p className='text text_type_digits-default pr-2'>
          {ingredient.price}
        </p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </li>
  );
}


IngredientItem.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired,
  setIngredientPopup: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default React.memo(IngredientItem);
