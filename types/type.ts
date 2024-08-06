export interface SearchRecipeArgs {
  queryText?: any;
  nextPageLink?: any;
}

export interface Recipe {
  id: string;
  image?: string;
  name: string;
  cuisineType?: string; // Assuming a single string; change to `string[]` if it's an array
  mealType?: string; // Assuming a single string; change to `string[]` if it's an array
}
