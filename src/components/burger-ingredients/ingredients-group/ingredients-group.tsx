import React, { ForwardedRef, type ReactNode } from 'react';
import IngredientItem from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../services/types/data';
import { IngredientsByCategory, IngredientsByCategoryRuText } from '../../../services/types';
import styles from './ingredients-group.module.css';


type Props = {
  children? : ReactNode;
  ingredients: Ingredient[];
  heading: IngredientsByCategoryRuText;
  groupId: IngredientsByCategory;
}


const IngredientsGroup = React.forwardRef(({ heading, groupId, ingredients }: Props, ref: ForwardedRef<HTMLUListElement>) => {
  return (
    <section className={`${styles.section} pb-10`} id={groupId}>
      <h2 className='text text_type_main-medium'>
        {heading}
      </h2>
      <ul ref={ref} className={`${styles.group} pl-4`}>
        {
          ingredients.map((ingredient) => (
            <IngredientItem
              key={ingredient._id}
              ingredient={ingredient}
            />
          ))
        }
      </ul>
    </section>
  );
});

export default IngredientsGroup;
