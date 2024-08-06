import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Recipe } from "@/types/type";

interface RecipeItemProps {
  recipe?: Recipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const { image, name, cuisineType, mealType, id } = recipe || {};

  return (
    <div className="recipe-list-item group">
      <div className="recipe-item-top">
        <LazyLoadImage
          src={image}
          className="recipe-item-img group-hover:scale-125"
          alt={name}
        />
      </div>
      <div className="recipe-item-bottom">
        <div className="p-4">
          <h3 className="recipe-item-name">{name}</h3>
          <ul className="recipe-item-info">
            <li>
              <span>Cuisine: &nbsp;</span>
              <span>{cuisineType || "Unknown"}</span>
            </li>
            <li>
              <span>{mealType || "Unknown"}</span>
            </li>
          </ul>
        </div>
        <Link href={`/recipes/selected/${id}`} className="read-btn">
          Real Full Recipe <AiOutlineArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;
