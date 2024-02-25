import { type ReactNode } from 'react';
import { ingredientsToShow } from '../../../utils/constants';
import { Ingredient } from '../../../services/types/data';
import styles from './ingredients-preview.module.css';


type Props = {
  children?: ReactNode;
  ingredient: Ingredient;
  index: number;
  originArrLength: number;
}


function IngredientsPreview({ ingredient, index, originArrLength }: Props) {
  const counter = originArrLength - (ingredientsToShow + 1);

  return (
    <li
      className={styles.ingredientsPreview}
      style={{ zIndex: ingredientsToShow - index }}
    >
      <img
        src={ingredient.image}
        alt={`${ingredient.name}.`}
        className={styles.img}
      />

      {index === ingredientsToShow && originArrLength > (ingredientsToShow + 1) && (
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

export default IngredientsPreview;
