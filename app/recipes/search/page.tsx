"use client";

import { useEffect } from "react";
import {
  getRecipesError,
  getRecipesStatus,
  getSearchQuery,
  selectSearchResult,
  getRecipesNextPage,
  clearSearch,
} from "@/store/action/recipe-slice";
import { fetchSearchRecipe } from "@/store/action/recipe-slice";
import { scrollToTop } from "@/utils/scrollOnTop";
import { no_results } from "@/utils/images";
import { AiOutlineClose } from "react-icons/ai";
import { STATUS } from "@/utils/status";
import Loader from "@/app/_components/(shared)/Loader/Loader";
import RecipeList from "@/app/_components/Recipe/RecipeList";
import { useAppDispatch, useAppSelector } from "@/store";
import Image from "next/image";
import { Recipe } from "@/types/type";

type SearchStatus = (typeof STATUS)[keyof typeof STATUS];

const page = () => {
  const dispatch = useAppDispatch();
  const queryText = useAppSelector(getSearchQuery);
  const searchRecipes = useAppSelector(
    selectSearchResult
  ) as unknown as Recipe[];
  const searchStatus = useAppSelector(getRecipesStatus) as SearchStatus;
  const searchError = useAppSelector(getRecipesError);
  const nextPageLink = useAppSelector(getRecipesNextPage) as string | null;

  useEffect(() => scrollToTop(), []);

  useEffect(() => {
    dispatch(fetchSearchRecipe({ queryText, nextPageLink }));
  }, [queryText, dispatch]);

  if (!searchRecipes || searchRecipes.length === 0) {
    return (
      <div className="container py-8 custom-min-h no-results-msg">
        <Image src={no_results} alt="no results image" />
        <p>No search results found!</p>
      </div>
    );
  }

  return (
    <main className="recipe-search-page custom-min-h pt-[4px]">
      <section>
        <div className="recipes-list">
          <div className="container">
            {searchRecipes?.length > 0 && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => dispatch(clearSearch())}>
                <AiOutlineClose className="clear-btn-icon" /> clear Result
              </button>
            )}

            {STATUS.LOADING === searchStatus ? (
              <Loader />
            ) : STATUS.FAILED === searchStatus ? (
              searchError
            ) : (
              <RecipeList recipes={searchRecipes} />
            )}

            {nextPageLink && nextPageLink.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() =>
                    dispatch(
                      fetchSearchRecipe({
                        queryText: "",
                        nextPageLink: nextPageLink,
                      })
                    )
                  }>
                  Next Page
                </button>
              </div>
            )}

            {/* {nextPageLink?.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() =>
                    dispatch(
                      fetchSearchRecipe({
                        queryText: "",
                        nextPageLink: nextPageLink,
                      })
                    )
                  }
                >
                  Next Page
                </button>
              </div>
            )} */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
