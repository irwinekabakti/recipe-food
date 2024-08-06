"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "@/app/_components/BreadCrumb/BreadCrumb";
import Loader from "@/app/_components/(shared)/Loader/Loader";
import PageTitle from "@/app/_components/PageTitle/PageTitle";
import Select from "@/app/_components/Select/Select";
import {
  getTypesRecipeNextPage,
  getTypesRecipesError,
  getTypesRecipesStatus,
  selectTypesAllRecipes,
} from "@/store/action/types-slice";
import { fetchTypesRecipes } from "@/store/action/types-slice";
import { scrollToTop } from "@/utils/scrollOnTop";
import { STATUS } from "@/utils/status";
import RecipeList from "@/app/_components/Recipe/RecipeList";
import { AppDispatch } from "@/store";

const page: React.FC = () => {
  const tempData = useParams();
  const [typeData, setTypeData] = useState<any>(tempData);
  console.log(typeData, "<==");
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector(selectTypesAllRecipes);
  const recipesStatus = useSelector(getTypesRecipesStatus);
  const recipesError = useSelector(getTypesRecipesError);
  const nextPageLink = useSelector(getTypesRecipeNextPage);

  useEffect(() => {
    dispatch(fetchTypesRecipes({ typeData, nextPageLink }));
  }, [typeData, dispatch]);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeData((prevData: any) => ({
      ...prevData,
      typeName: event.target.value,
    }));
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="recipe-list-page custom-min-h pt-[4px]">
      <section>
        <PageTitle titleData={typeData} />
        <div className="container">
          <div className="breadcrumb-select-wrapper">
            <Breadcrumb breadcrumbData={typeData} />
            <Select typeData={typeData} handleSelection={handleSelection} />
          </div>
        </div>

        <div className="recipes-list">
          <div className="container">
            {STATUS.LOADING === recipesStatus ? (
              <Loader />
            ) : STATUS.FAILED === recipesStatus ? (
              <div>{recipesError}</div>
            ) : (
              <RecipeList recipes={recipes} />
            )}

            {nextPageLink && nextPageLink.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() =>
                    dispatch(fetchTypesRecipes({ typeData: {}, nextPageLink }))
                  }>
                  Next Page
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
