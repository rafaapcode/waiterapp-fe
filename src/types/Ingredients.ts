export interface IngredientsTypeFromAPI {
  _id: string;
  icon: string;
  name: string;
}


export interface IngredientTypeForFe {
  id: string;
  name: string;
  selected?: boolean;
  icon: string;
}
