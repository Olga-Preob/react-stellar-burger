import { Ingredient } from '../services/types/data';


export const getIngredient = (ingredients: Ingredient[], id: string) => ingredients.find((ingredient) => ingredient._id === id);
