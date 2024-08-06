import React from "react";
import RecipeItem from "./RecipeItem";
import { Recipe } from "@/types/type";

interface RecipeListProps {
  recipes: Recipe[];
  recipesLength?: number;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  recipesLength = 20,
}) => {
  return (
    <div className="recipe-list">
      {recipes.slice(0, recipesLength).map((recipe) => (
        <RecipeItem recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
};

export default RecipeList;
