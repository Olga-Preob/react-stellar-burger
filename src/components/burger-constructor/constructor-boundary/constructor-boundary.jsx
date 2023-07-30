import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '../../../utils/prop-types'
import PropTypes from 'prop-types';


function ConstructorBoundary({ ingredient, position }) {
  return (
    <ConstructorElement
      type={position}
      isLocked={true}
      text={`${ingredient.name} ${position === 'top' ? '(верх)' : '(низ)'}`}
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
}


ConstructorBoundary.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired,
  position: PropTypes.string.isRequired
}

export default ConstructorBoundary;
