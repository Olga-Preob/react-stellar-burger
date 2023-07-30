import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types';
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
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired
}

export default ConstructorFilling;
