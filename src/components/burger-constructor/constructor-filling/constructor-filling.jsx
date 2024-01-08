import { useRef, useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../../services/actions/burger-constructor';
import { DECREASE_ITEM } from '../../../services/actions/ingredients';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './constructor-filling.module.css';


function ConstructorFilling({ ingredient, index }) {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {
        dragIndex,
        hoverIndex
      }
    });
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
        moveIngredient(item.index, index);
      }
    }
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'fillingIngredients',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
    hover: (item, monitor) => {
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
    dispatch({
      type: REMOVE_INGREDIENT,
      payload: {
        key: ingredient.key
      }
    });

    dispatch({
      type: DECREASE_ITEM,
      payload: {
        _id: ingredient._id
      }
    });
  }

  return (
    <li className={`${styles.item} ${isDragging ? styles.dragged : null}`} style={{ opacity }} ref={ref}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        isLocked={false}
        handleClose={handleClose}
        extraClass={isActive ? styles.itemCanDrop : null }
      />
    </li>
  );
}


ConstructorFilling.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired
}

export default ConstructorFilling;
