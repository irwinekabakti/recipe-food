const extractIdAfterHash = (uri: string): string => {
  let posOfHas = uri.indexOf("#");
  let extractedId = uri.slice(posOfHas + 1);
  return extractedId;
};

const extractRecipeData = (data: any) => {
  let tempRecipes = data.hits.map((tempRecipe: any) => {
    return {
      id: extractIdAfterHash(tempRecipe.recipe.uri),
      name: tempRecipe.recipe.label,
      image: tempRecipe.recipe.image,
      images: tempRecipe.recipe.images,
      source: tempRecipe.recipe.source,
      source_url: tempRecipe.recipe.url,
      healthLabels: tempRecipe.recipe.healthLabels,
      ingredientLines: tempRecipe.recipe.ingredientLines,
      ingredients: tempRecipe.recipe.ingredients,
      calories: tempRecipe.recipe.calories,
      totalWeight: tempRecipe.recipe.totalWeight,
      totalTime: tempRecipe.recipe.totalTime,
      cuisineType: tempRecipe.recipe.cuisineType,
      mealType: tempRecipe.recipe.mealType,
      dishType: tempRecipe.recipe.dishType,
      nutrients: tempRecipe.recipe.totalNutrients,
    };
  });

  return {
    data: tempRecipes,
    nextPage: data?._links?.next?.href,
  };
};

const extractSingleRecipeData = (data: any) => {
  let tempRecipe = {
    id: extractIdAfterHash(data.recipe.uri),
    name: data.recipe.label,
    image: data.recipe.image,
    images: data.recipe.images,
    source: data.recipe.source,
    source_url: data.recipe.url,
    healthLabels: data.recipe.healthLabels,
    ingredientLines: data.recipe.ingredientLines,
    ingredients: data.recipe.ingredients,
    calories: data.recipe.calories,
    totalWeight: data.recipe.totalWeight,
    totalTime: data.recipe.totalTime,
    cuisineType: data.recipe.cuisineType,
    mealType: data.recipe.mealType,
    dishType: data.recipe.dishType,
    nutrients: data.recipe.totalNutrients,
  };

  return tempRecipe;
};

export { extractIdAfterHash, extractRecipeData, extractSingleRecipeData };
