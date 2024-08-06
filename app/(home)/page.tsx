"use client";

import Link from "next/link";
import BannerSlider from "../_components/BannerSlider/BannerSlider";
import CategorySlider from "../_components/CategorySlider/CategorySlider";
import Loader from "../_components/(shared)/Loader/Loader";
import MealSlider from "../_components/MealSlider/MealSlider";
import Title from "../_components/Title/Title";
import { dishTypeData } from "@/utils/data";
import { pattern_one } from "../../utils/images";
import { useEffect } from "react";
import { fetchRecipes } from "@/store/action/recipe-slice";
import {
  getRecipesError,
  getRecipesStatus,
  selectAllRecipes,
} from "@/store/action/recipe-slice";
import { STATUS } from "../../utils/status";
import RecipeList from "../_components/Recipe/RecipeList";
import { scrollToTop } from "@/utils/scrollOnTop";
import { useAppDispatch, useAppSelector } from "@/store";
import Image from "next/image";
import { Recipe } from "@/types/type";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectAllRecipes);
  const recipesStatus = useAppSelector(getRecipesStatus);
  const recipesError = useAppSelector(getRecipesError);

  useEffect(() => {
    dispatch(fetchRecipes("chicken"));
  }, [dispatch]);

  useEffect(() => scrollToTop(), []);

  return (
    <main className="home-page custom-min-h pt-[4px]">
      <BannerSlider />
      <section
        className="categories"
        style={{
          background: `url('${pattern_one}') center/cover no-repeat`,
        }}>
        <div className="container">
          <Title subTitle="Choose a Category" mainTitle="Recipe Categories" />
        </div>
        <CategorySlider />
      </section>

      <section className="showcase-recipes">
        <div className="container">
          <Title subTitle="Some Recipes" mainTitle="Chicken Recipes" />
          {/* recipes list */}

          {STATUS.LOADING === recipesStatus ? (
            <Loader />
          ) : STATUS.FAILED === recipesStatus ? (
            <div>{recipesError}</div>
          ) : (
            <RecipeList recipes={recipes as Recipe[]} recipesLength={12} />
          )}
        </div>
      </section>

      <section className="dishes">
        <div className="container">
          <Title subTitle="Find Dishes you love" mainTitle="Recipe Dishes" />
          <div className="dishes-list">
            {dishTypeData?.map((dish, idx) => (
              <Link
                key={idx}
                href={`recipes/dish/${dish?.type}`}
                className="dishes-item">
                <Image
                  src={dish.image}
                  alt="img-dish"
                  quality={100}
                  rel="preload"
                />
                <p className="dishes-item-name">{dish.type}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="meals">
        <div className="container">
          <Title subTitle="Get Meal Ready" mainTitle="Recipe Meals" />
          <MealSlider />
        </div>
      </section>
    </main>
  );
};

export default Home;
