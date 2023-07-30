import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-filling.module.css';


function ConstructorFilling({ ingredient }) {
  return (
    <li className={`${styles.item}`}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
}


ConstructorFilling.propTypes = {
  ingredient: PropTypes.object.isRequired
}

export default ConstructorFilling;
