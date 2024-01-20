import { memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_MODAL } from '../../../services/actions/modal';
import { SET_CURRENT_INGREDIENT_ID } from '../../../services/actions/current-values';
import {
  INCREASE_ITEM,
  INCREASE_BUN_ITEM,
  DECREASE_BUN_ITEM
} from '../../../services/actions/ingredients';
import { addIngredientWithKey } from '../../../services/actions/burger-constructor'
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredient-item.module.css';


function IngredientItem({ ingredient }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const burgerBun = useSelector((store) => store.burgerConstructorReducer.bun);

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
          if (burgerBun) {
            dispatch({
              type: DECREASE_BUN_ITEM,
              payload: {
                _id: burgerBun._id
              }
            });
          };

          dispatch({
            type: INCREASE_BUN_ITEM,
            payload: {
              _id: item._id
            }
          });
        } else {
          dispatch({
            type: INCREASE_ITEM,
            payload: {
              _id: item._id
            }
          });
        }
      }
    },
  });

  const opacity = isDragging ? .4 : 1;

  const handleOnClick = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT_ID,
      payload: {
        currentIngredientId: ingredient._id
      }
    });

    dispatch({
      type: OPEN_MODAL,
      payload: {
        typeOfModal: 'ingredientInfo'
      }
    });
  }

  return (
    <li
      ref={dragRef}
      className={styles.item}
      onClick={handleOnClick}
      style={{ opacity }}
    >
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={styles.link}
      >
        {ingredient.__v ? <Counter count={ingredient.__v} size='default' /> : null}

        <div className={`${styles.description}`}>
          <img
            className={`${styles.image}`}
            src={ingredient.image}
            alt={`${ingredient.name}.`}
            title={ingredient.name}
          />

          <div className={styles.price}>
            <p className='text text_type_digits-default'>
              {ingredient.price}
            </p>
            <CurrencyIcon type='primary' />
          </div>

          <p className={`${styles.name} text text_type_main-default`}>
            {ingredient.name}
          </p>
        </div>
      </Link>
    </li>
  );
}


IngredientItem.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired
}

export default memo(IngredientItem);
