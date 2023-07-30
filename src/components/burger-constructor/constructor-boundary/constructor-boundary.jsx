import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';


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
  ingredient: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired
}

export default ConstructorBoundary;
