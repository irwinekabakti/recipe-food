"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { scrollToTop } from "@/utils/scrollOnTop";
import { BsArrowLeft } from "react-icons/bs";
import {
  fetchSingleRecipe,
  selectSingleRecipe,
} from "@/store/action/recipe-slice";
import Loader from "@/app/_components/(shared)/Loader/Loader";
import {
  AiFillFire,
  AiOutlineCheckSquare,
  AiOutlineFieldTime,
} from "react-icons/ai";
import { BiDish } from "react-icons/bi";
import { GiWeightScale } from "react-icons/gi";
import "lightbox2/dist/css/lightbox.css";
import "lightbox2/dist/js/lightbox";
import { useAppDispatch, useAppSelector } from "@/store";

const page: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as any;
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectSingleRecipe) as any;
  let tempNutrients: [
    string,
    { label: string; quantity: number; unit: string }
  ][] = [];
  let tempImages: [string, { url: string; width: number; height: number }][] =
    [];

  useEffect(() => scrollToTop(), []);

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
  }, [recipeId, dispatch]);

  if (recipe) {
    tempNutrients = Object.entries(recipe.nutrients);
    tempImages = Object.entries(recipe.images);
  } else {
    return <Loader />;
  }

  return (
    <main className="recipe-single-page custom-min-h pt-[4px]">
      <section className="recipe-single">
        <div className="container recipe-single-top">
          <button
            type="button"
            aria-label="btn"
            onClick={() => router.back()}
            className="back-btn flex items-center font-semibold mb-4">
            <BsArrowLeft className="me-2" /> Go Back
          </button>

          <h3 className="recipe-single-name">{recipe?.name}</h3>
          <div className="recipe-group-one">
            <div className="recipe-left">
              <div className="recipe-left-img-wrapper">
                <Image
                  src={recipe?.image}
                  alt={recipe?.name}
                  width={500}
                  height={500}
                  quality={100}
                  rel="preload"
                />
              </div>
              <Link href={recipe?.source_url}>
                <span>Source:</span> {recipe?.source_url}
              </Link>
            </div>

            <div className="recipe-right">
              <h4 className="recipe-right-name">{recipe?.name}</h4>
              <p className="badge-orange">{recipe?.cuisineType.join(", ")}</p>
              <div className="recipe-block general-info">
                <div className="block-list">
                  <div className="list-elem">
                    <div className="list-elem-left">
                      <AiFillFire className="me-2" />
                      <span>calories</span>
                    </div>
                    <span className="list-elem-value">
                      {recipe?.calories?.toFixed(4)}
                    </span>
                  </div>

                  <div className="list-elem">
                    <div className="list-elem-left">
                      <BiDish className="me-2" />
                      <span>dish type</span>
                    </div>
                    <span className="list-elem-value">
                      {recipe?.dishType.join(", ")}
                    </span>
                  </div>

                  <div className="list-elem">
                    <div className="list-elem-left">
                      <GiWeightScale className="me-2" />
                      <span>Weight</span>
                    </div>
                    <span className="list-elem-value">
                      {recipe?.totalWeight?.toFixed(4)}
                    </span>
                  </div>

                  <div className="list-elem">
                    <div className="list-elem-left">
                      <AiOutlineFieldTime className="me-2" />
                      <span>Time</span>
                    </div>
                    <span className="list-elem-value">{recipe?.totalTime}</span>
                  </div>
                </div>
              </div>

              <div className="recipe-block health-labels">
                <p className="block-title">Health Label:</p>
                <ul className="block-list">
                  {recipe.healthLabels
                    ?.slice(0, 10)
                    .map((label: any, idx: any) => (
                      <li key={idx}>{label.replace("-", " ")}</li>
                    ))}
                </ul>
              </div>

              <div className="recipe-block images">
                <p className="block-title">Images (different size) :</p>
                <div className="block-list">
                  {tempImages?.map(([key, image], idx): any => (
                    <div key={idx} className="block-list-item-wrapper">
                      <Link
                        href={image?.url}
                        data-lightbox="images"
                        className="block-list-item">
                        <Image
                          src={image?.url}
                          alt={key}
                          width={100}
                          height={100}
                          quality={100}
                          rel="preload"
                        />
                      </Link>
                      <p className="image-item-info">
                        <span className="image-item-size">
                          {image?.width} x {image?.height}
                        </span>
                        <span className="image-item-name">({key})</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container recipe-single-bottom">
          <div className="recipe-block ingredients">
            <p className="block-title text-lg">Ingredients:</p>
            <ul className="block-list">
              {recipe.ingredients?.map((ingredient: any, idx: any) => (
                <li key={idx} className="block-list-item">
                  <AiOutlineCheckSquare className="text-jet" size={22} />
                  <div>
                    <p className="font-semibold">{ingredient?.text}</p>
                    <div className="badges-group">
                      <span>Measure:</span> {ingredient?.quantity}
                      {ingredient?.measure} &nbsp;
                      <span>Weight:</span>
                      {ingredient?.weight.toFixed(1)} &nbsp;
                      <span>Food:</span>
                      {ingredient?.food}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-block nutrients">
            <p className="block-title text-lg">Nutrient:</p>
            <ul className="block-list">
              {tempNutrients?.map(([key, nutrient], idx): any => (
                <div key={idx} className="block-list-item">
                  <li>{nutrient?.label}</li>
                  <li>
                    {nutrient?.quantity.toFixed(1)} {nutrient?.unit}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
