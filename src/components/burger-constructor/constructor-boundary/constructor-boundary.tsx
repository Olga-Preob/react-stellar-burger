import { type ReactNode } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../../services/types/data';


type Props = {
  ingredient: Ingredient;
  position: 'top' | 'bottom';
  children?: ReactNode;
}


function ConstructorBoundary({ ingredient, position }: Props) {
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

export default ConstructorBoundary;
