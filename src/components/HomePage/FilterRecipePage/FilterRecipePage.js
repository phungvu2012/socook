import "./FilterRecipePage.scss";
import { useLocation, useParams } from "react-router-dom";
import homePage from "../../../api/homePageApi";
import { useEffect, useState } from "react";
import RecipesSearchResult from "./../../SearchPage/RecipeSearchResult/RecipeSearchResult";
import Pagination from "./../../Pagination/Pagination";
import Loading from "../../Loading/Loading";

function FilterRecipePage() {
  const { idFilter } = useParams();
  const { state } = useLocation();
  const [categoryFromGroup, setCategoryFromGroup] = useState([]);
  const [categorySelect, setCategorySelect] = useState((state?.name) ? {id: state?.id || 0, name: state?.name} : { id: 0, name: "all" });
  const [recipeFromCategoryGroup, setRecipeFromCategoryGroup] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limitItemInPage = 8;

  const receiveValuePagination = (curPage) => {
    setCurrentPage(curPage);
  };

  useEffect(() => {
    setCategorySelect((state?.name) ? {id: state?.id || 0, name: state?.name} : { id: 0, name: "all" });
  }, [state])

  useEffect(() => {
    homePage
      .getCategoryInGroup(idFilter)
      .then((res) => {
        setCategoryFromGroup([...res.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [idFilter]);

  useEffect(() => {
    if (categorySelect.name === "all") {
      homePage
        .getAllRecipeFromCategoryGroup(idFilter)
        .then((res) => {
          setRecipeFromCategoryGroup([...res.data]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      
      homePage
        .getAllRecipeFromCategory(categorySelect.id)
        .then((res) => {
          setRecipeFromCategoryGroup([...res.data]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [categorySelect]);
  return (
    <div className="filter-recipe-by-category-container">
      {isLoading && <Loading />}
      {console.log(state)}
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="category-area-container">
              <p>
                Chọn nhãn món ăn thuộc nhóm{" "}
                <span>{state.categoryGroupName}</span>
              </p>
              <div className="category-container">
                <span
                  className={`category-item ${
                    "all" !== categorySelect.name
                      ? "category-item-not-select"
                      : ""
                  }`}
                  data-value="all"
                  onClick={(e) => {
                    setCurrentPage(1);
                    setCategorySelect({ id: 0, name: e.target.dataset.value });
                    setIsLoading(true)
                  }}
                >
                  Tất cả
                </span>
                {categoryFromGroup?.map((category, index) => {
                  return (
                    <span
                      className={`category-item ${
                        category.name !== categorySelect.name
                          ? "category-item-not-select"
                          : ""
                      }`}
                      key={index}
                      onClick={() => {
                        setCurrentPage(1);
                        setCategorySelect(category);
                        setIsLoading(true)
                      }}
                    >
                      {category.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-12">
            <div className="filter-recipe-result-container">
              <div className="container">
                <div className="row">
                  {!recipeFromCategoryGroup[0] ? (
                    <p>Không tìm thấy món ăn theo nhãn đã chọn</p>
                  ) : (
                    recipeFromCategoryGroup
                      ?.slice(
                        (currentPage - 1) * limitItemInPage,
                        currentPage * limitItemInPage
                      )
                      .map((recipe) => {
                        return (
                          <div className="col-xl-3 col-lg-4 col-md-4 col-6" key={recipe.id}>
                            <RecipesSearchResult recipe={recipe} />
                          </div>
                        );
                      })
                  )}
                </div>
                {recipeFromCategoryGroup[0] && (
                  <Pagination
                    itemArray={recipeFromCategoryGroup}
                    limitItemInPage={limitItemInPage}
                    passValuePagination={receiveValuePagination}
                    currentPagePass={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterRecipePage;
