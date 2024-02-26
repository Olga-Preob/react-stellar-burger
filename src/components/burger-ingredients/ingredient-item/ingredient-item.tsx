import { memo, type ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, Link } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { setCurrentIngredientId } from '../../../services/slices/current-values';
import { decreaseBunItem, increaseBunItem, increaseFillingItem } from '../../../services/slices/ingredients';
import { addIngredientWithKey } from '../../../services/slices/burger-constructor';
import { Ingredient } from '../../../services/types/data';
import styles from './ingredient-item.module.css';


type Props = {
  children?: ReactNode;
  ingredient: Ingredient;
}


function IngredientItem({ ingredient }: Props) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const burgerBun = useAppSelector((store) => store.burgerConstructor.bun);

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
            dispatch(decreaseBunItem({
              _id: burgerBun._id
            }));
          };

          dispatch(increaseBunItem({
            _id: item._id
          }));
        } else {
          dispatch(increaseFillingItem({
            _id: item._id
          }));
        }
      }
    },
  });

  const opacity = isDragging ? .4 : 1;

  const handleOnClick = () => {
    dispatch(setCurrentIngredientId({
      currentIngredientId: ingredient._id
    }));
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

export default memo(IngredientItem);
