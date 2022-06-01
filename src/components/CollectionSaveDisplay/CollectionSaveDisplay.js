import "./CollectionSaveDisplay.scss";

import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import recipeApi from "../../api/recipeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
function CollectionSaveDisplay() {
  const [recipes, setRecipes] = useState([]);
  const { collectionId } = useParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limitItemInPage = 18;

  const receiveValuePagination = (curPage) => {
    setCurrentPage(curPage);
  };
  useEffect(() => {
    async function getRecipes() {
      await recipeApi
        .getRecipeInCollection(collectionId)
        .then((res) => {
          setRecipes([...res.data.data]);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("F: ", err);
          setIsLoading(false);
        });
    }
    getRecipes();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      <div className="collection-display-container">
        <div className="container">
          <h3 className="collection-display-title">
            {location.state.collectionName}
          </h3>
          {!recipes[0] ? (
            <h4>Chưa có công thức nào trong bộ sưu tập</h4>
          ) : (
            <div className="row">
              {recipes
                .slice(
                  (currentPage - 1) * limitItemInPage,
                  currentPage * limitItemInPage
                )
                .map((recipe) => {
                  return (
                    <div className="col-2" key={recipe.id}>
                      <div className="collection-recipe-container">
                        <Link
                          to={`/recipe/${recipe.id}`}
                          className="collection-recipe-wrapper"
                        >
                          <div className="collection-recipe-image-wrapper">
                            <div className="image-overlay"></div>
                            <img
                              src={recipe.main_image_url}
                              alt={recipe.title}
                              className="collection-recipe-image"
                            />
                          </div>
                          <div className="collection-recipe-info">
                            <h5 className="collection-recipte-title">
                              {recipe.title}
                            </h5>
                            <div className="collection-recipe-detail">
                              <div className="collection-recipe-detail-number">
                                <span>
                                  <FontAwesomeIcon icon={faClock} />
                                  {` ${recipe.cooking_time}`} phút
                                </span>
                                <span>
                                  <FontAwesomeIcon icon={faEye} />
                                  {` ${recipe.total_views}`}
                                </span>
                              </div>
                              <p>
                                Khẩu phần ăn: {recipe.amount_of_people} người
                              </p>
                            </div>
                          </div>
                        </Link>
                        <a href="/" className="collection-recipe-owner">
                          <span>Người tạo:</span> {recipe.user_name}
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {recipes[0] && (
        <Pagination
          itemArray={recipes}
          limitItemInPage={limitItemInPage}
          passValuePagination={receiveValuePagination}
          currentPagePass={currentPage}
        />
      )}
    </>
  );
}

export default CollectionSaveDisplay;
