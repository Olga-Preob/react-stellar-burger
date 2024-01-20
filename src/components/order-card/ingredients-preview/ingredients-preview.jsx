import { INGREDIENTS_TO_SHOW } from '../../../utils/constants';
import { ingredientPropType } from '../../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './ingredients-preview.module.css';


function IngredientsPreview({ ingredient, index, originArrLength }) {
  const counter = originArrLength - (INGREDIENTS_TO_SHOW + 1);

  return (
    <li
      className={styles.ingredientsPreview}
      style={{ zIndex: INGREDIENTS_TO_SHOW - index }}
    >
      <img
        src={ingredient.image}
        alt={`${ingredient.name}.`}
        className={styles.img}
      />

      {index === INGREDIENTS_TO_SHOW && originArrLength > (INGREDIENTS_TO_SHOW + 1) && (
        <>
          <p className={`${styles.ingredientsCounter} text text_type_main-default`}>
            {counter > 99 ? `99+` : `+${counter}`}
          </p>
          <span className={styles.imgCover}></span>
        </>
      )}
    </li>
  );
}


IngredientsPreview.propTypes = {
  ingredient: PropTypes.shape({ ingredientPropType }).isRequired,
  index: PropTypes.number.isRequired,
  originArrLength: PropTypes.number.isRequired
};

export default IngredientsPreview;
