import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { GET_CURRENT_INGREDIENT } from '../../../services/actions/ingredient-details';
import {
  INCREASE_ITEM,
  INCREASE_BUN_ITEM,
  DECREASE_BUN_ITEM
} from '../../../services/actions/ingredients';
import { addIngredientWithKey } from '../../../services/actions/burger-constructor'
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';


function IngredientItem({ ingredient, onClick }) {
  const dispatch = useDispatch();

  const burgersData = useSelector((state) => state.burgerConstructorReducer);

  const [{ isDragging }, dragRef] = useDrag({
    type: ingredient.type,
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        dispatch(addIngredientWithKey(ingredient));

        if (item.type === 'bun') {
          if (burgersData.bun) {
            dispatch({
              type: DECREASE_BUN_ITEM,
              _id: burgersData.bun._id,
            });
          };

          dispatch({
            type: INCREASE_BUN_ITEM,
            _id: item._id,
          });
        } else {
          dispatch({
            type: INCREASE_ITEM,
            _id: item._id,
          });
        }
      }
    },
  });

  const opacity = isDragging ? .4 : 1;

  const onClickHandler = () => {
    dispatch({
      type: GET_CURRENT_INGREDIENT,
      currentIngredient: ingredient
    });

    onClick();
  }

  return (
    <li ref={dragRef} className={styles.item} onClick={onClickHandler} style={{ opacity }}>
      {ingredient.__v ? <Counter count={ingredient.__v} size='default' /> : null}
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
  onClick: PropTypes.func.isRequired
}

export default React.memo(IngredientItem);
