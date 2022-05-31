import "./HomePage.scss";
import React, { useEffect, useState } from "react";
import homePage from "../../api/homePageApi";
import { Link, Outlet } from "react-router-dom";
import RecipesSearchResult from "../SearchPage/RecipeSearchResult/RecipeSearchResult";
import CollectionsSearchResult from "../SearchPage/CollectionSearchResult/CollectionSearchResult";
import RankRecipe from "./RankRecipe/RankRecipe";
import RankUser from "./RankUser/RankUser";
import SliderHome from "./slider";
import Loading from "../Loading/Loading";

const Home = () => {
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [topViewRecipe, setTopViewRecipe] = useState([]);
  const [topNewRecipe, setTopNewRecipe] = useState([]);
  const [topSaveCollection, setTopSaveCollection] = useState([]);
  const [topNewCollection, setTopNewCollection] = useState([]);
  const [isInteractionCollection1, setIsInteractionCollection1] =
    useState(false);
  const [isInteractionCollection2, setIsInteractionCollection2] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    homePage
      .getCategory()
      .then((res) => {
        setCategoryGroups([...res.data]);
      })
      .catch((err) => console.log("F: ", err));

    homePage
      .getTopViewRecipe()
      .then((res) => {
        setTopViewRecipe([...res.data.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    homePage
      .getTopNewRecipe()
      .then((res) => {
        setTopNewRecipe([...res.data]);
      })
      .catch((err) => console.log("err", err));
  }, []);

  useEffect(() => {
    homePage
      .getTopSaveCollecion()
      .then((res) => {
        console.log("res SC: ", res);
        setTopSaveCollection([...res.data]);
      })
      .catch((err) => console.log("SC F:", err));
    homePage
      .getTopNewCollection()
      .then((res) => {
        setTopNewCollection([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [isInteractionCollection1, isInteractionCollection2]);

  return (
    <div className="home-page">
      {isLoading && <Loading />}
      <div className="container">
        <div className="row mt-1 mt-xl-2">
          <SliderHome />
        </div>
        <div className="row">
          <div className="category-group-container">
            {categoryGroups?.map((categoryGroup, index) => {
              return (
                <Link
                  to={`/filter-recipe/${categoryGroup.id}`}
                  className="category-group-item"
                  key={index}
                  state={{ categoryGroupName: categoryGroup.name }}
                >
                  {categoryGroup.name}
                </Link>
              );
            })}
          </div>
          <div className="col-xl-9 col-lg-8">
            <div className="top-view-recipe">
              <h4>Công thức nổi bật</h4>
              <div className="container">
                <div className="row">
                  {topViewRecipe?.map((recipe) => {
                    return (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6 col-6"
                        key={recipe.id}
                      >
                        <RecipesSearchResult recipe={recipe} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="top-new-recipe">
              <h4>Công thức mới nhất</h4>
              <div className="container">
                <div className="row">
                  {topNewRecipe?.slice(0, 8).map((recipe) => {
                    return (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6 col-6"
                        key={recipe.id}
                      >
                        <RecipesSearchResult recipe={recipe} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="top-save-collection">
              <h4>Bộ sưu tập nổi bật</h4>
              <div className="container">
                {console.log("save col: ", topSaveCollection)}
                <div className="row">
                  {topSaveCollection?.map((collection) => {
                    return (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6 col-6"
                        key={collection.id}
                      >
                        <CollectionsSearchResult
                          collection={collection}
                          setIsInteractionCollection={
                            setIsInteractionCollection1
                          }
                          isInteractionCollection={isInteractionCollection1}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="top-new-collection">
              <h4>Bộ sưu tập mới nhất</h4>
              <div className="container">
                <div className="row">
                  {topNewCollection?.slice(0, 8).map((collection) => {
                    return (
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6 col-6"
                        key={collection.id}
                      >
                        <CollectionsSearchResult
                          collection={collection}
                          setIsInteractionCollection={
                            setIsInteractionCollection2
                          }
                          isInteractionCollection={isInteractionCollection2}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <RankUser />
            <RankRecipe />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
