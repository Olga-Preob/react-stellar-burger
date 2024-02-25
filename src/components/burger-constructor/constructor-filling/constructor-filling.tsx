import { useRef, useCallback, type ReactNode } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { removeIngredient, moveIngredient } from '../../../services/slices/burger-constructor';
import { decreaseFillingItem } from '../../../services/slices/ingredients';
import { MoveIngredientCallback } from '../../../services/types';
import { Ingredient } from '../../../services/types/data';
import styles from './constructor-filling.module.css';


type Props = {
  ingredient: Ingredient;
  index: number;
  children?: ReactNode;
}


function ConstructorFilling({ ingredient, index }: Props) {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const moveIngredientCallback = useCallback<MoveIngredientCallback>((dragIndex, hoverIndex) => {
    dispatch(moveIngredient({
      dragIndex,
      hoverIndex
    }));
  }, []);

  const [{ isDragging }, drag] = useDrag({
    type: 'fillingIngredients',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        moveIngredientCallback(item.index, index);
      }
    }
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'fillingIngredients',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    hover: (item: { index: number }, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (!ref.current) {
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  const isActive = canDrop && isOver ? true : false;
  const opacity = isDragging ? .3 : 1;

  const handleClose = () => {
    ingredient.key && dispatch(removeIngredient({
      key: ingredient.key
    }));

    dispatch(decreaseFillingItem({
      _id: ingredient._id
    }));
  }

  return (
    <li className={`${styles.item} ${isDragging ? styles.dragged : ''}`} style={{ opacity }} ref={ref}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        isLocked={false}
        handleClose={handleClose}
        extraClass={isActive ? styles.itemCanDrop : '' }
      />
    </li>
  );
}

export default ConstructorFilling;
