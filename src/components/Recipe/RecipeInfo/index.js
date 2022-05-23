import React, { useEffect, useState, lazy, Suspense } from "react";
import recipeApi from "../../../api/recipeApi";
import RecipeComment from "./RecipeComment/RecipeComment";

import { ReadMore } from "../../../features/editorText";

import { getToken } from "../../../features/sessionStorage";
import TagRecipe, {
  StepComponent,
  RecipeBreadcrumb,
  RecipeIcontList,
  Ingredient,
} from "./section";
import { useParams } from "react-router-dom";
import "./recipe.scss";

const RepiceInfo = () => {
  const params = useParams();
  const recipeId = params.recipeId;
  const tokenAccess = getToken();
  let [recipeInfo, setRecipeInfo] = useState();

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [amountOfPeople, setamountOfPeople] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [mainImageUrl, setMainImageUrl] = useState();
  const [step, setStep] = useState();
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState();
  const [numberLikes, setNumberLikes] = useState();

  useEffect(() => {
    recipeApi
      .getRecipe(tokenAccess, recipeId)
      .then((response) => {
        console.log(response?.data?.data);
        if (response?.data?.messageCode !== 1) throw { response };

        const data = response?.data?.data;
        setRecipeInfo(true);
        setId(data?.recipe?.id);
        setTitle(data?.recipe?.title);
        setShortDescription(data?.recipe?.short_description);
        setamountOfPeople(data?.recipe?.amount_of_people);
        setCookingTime(data?.recipe?.cooking_time);
        setMainImageUrl(data?.recipe?.main_image_url);
        setStep(data?.step);
        setCategory(data?.category);
        setIngredient(data?.ingredient);
        setNumberLikes(data?.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="recipe-page" style={{ backgroundColor: "" }}>
      <div className="container py-3">
        <RecipeBreadcrumb
          list={[
            { src: "/", name: "Trang chủ" },
            { src: "/", name: "Công thức" },
            { src: "/", name: `${title}` },
          ]}
        />
        <div className="recipe-header">
          <div className="recipe-header__left">
            <div
              className={
                `recipe-header__image-box` +
                (mainImageUrl ? " " : " placeholder-image")
              }
              style={{ backgroundImage: `url(${mainImageUrl})` }}
            ></div>
          </div>
          <div className="recipe-header__right">
            <div className="recipe-header__right-top">
              <h1
                className={
                  `recipe-header__title` +
                  (title ? "" : " placeholder-paragraph")
                }
              >
                {title ? title : <span>&nbsp;</span>}
              </h1>
              {shortDescription ? (
                <p className="recipe-header__description">
                  <ReadMore maxLine={3}>{shortDescription}</ReadMore>
                </p>
              ) : (
                <div className="recipe-header__description">
                  <p className="placeholder-paragraph">&nbsp;</p>
                  <p className="placeholder-paragraph">&nbsp;</p>
                  <p className="placeholder-paragraph">&nbsp;</p>
                </div>
              )}
            </div>
            <RecipeIcontList
              token={tokenAccess}
              recipeId={id}
              loading={!recipeInfo}
              time={cookingTime}
              amount={amountOfPeople}
              numberLikes={numberLikes}
            />
          </div>
        </div>
        <div className="recipe-body">
          <Ingredient loading={!recipeInfo} list={ingredient} />
          <div className="recipe-body__section shadow">
            <div className="recipe-body__step-list">
              <h3 className="recipe-body__title">Cách làm</h3>
              <StepComponent loading={!recipeInfo} stepList={step} />
            </div>
            <TagRecipe categorys={category} />
            <RecipeComment recipeId={recipeId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepiceInfo;
