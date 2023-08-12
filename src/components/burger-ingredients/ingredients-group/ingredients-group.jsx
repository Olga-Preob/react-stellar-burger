import React from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredients-group.module.css';


const IngredientsGroup = React.forwardRef(({ heading, groupId, ingredients, setIngredientPopup, onClick }, ref) => {
  return (
    <section className={`${styles.section} pb-10`} id={groupId}>
      <h2 className='text text_type_main-medium'>
        {heading}
      </h2>
      <ul ref={ref} className={`${styles.group} pl-4 pr-2`}>
        {
          ingredients.map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              ingredient={ingredient}
              setIngredientPopup={setIngredientPopup}
              onClick={onClick}
            />
          ))
        }
      </ul>
    </section>
  );
});


IngredientsGroup.propTypes = {
  heading: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  setIngredientPopup: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default IngredientsGroup;
