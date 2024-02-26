import { GetOrderIngredientsArr } from '../services/types';
import { Ingredient } from '../services/types/data';


export const getIngredient = (ingredients: Ingredient[], id: string) => ingredients.find((ingredient) => ingredient._id === id);

export const getOrderIngredientsArr: GetOrderIngredientsArr = (order, ingredientsArr, emptyIngredients) => {
  return order.ingredients.map((id: string) => {
    const ingredients = getIngredient(ingredientsArr, id);

    return ingredients || emptyIngredients;
  });
}
