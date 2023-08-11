import React, { useContext } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerInfoContext } from '../../../services/app-context';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';


function IngredientItem({ ingredient, setIngredientId, onClick }) {
  const { orderСomposition, setOrderСomposition } = useContext(BurgerInfoContext);

  const onClickHandler = () => {
    onClick();

    setIngredientId(ingredient._id);

    if (ingredient.type === 'bun') {
      setOrderСomposition({
        ...orderСomposition,
        bun: ingredient
      });
    } else {
      const newArrOfIngredients = Object.assign([], orderСomposition.ingredients);
      newArrOfIngredients.push(ingredient);
      setOrderСomposition({
        ...orderСomposition,
        ingredients: newArrOfIngredients
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
  setIngredientId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default React.memo(IngredientItem);
