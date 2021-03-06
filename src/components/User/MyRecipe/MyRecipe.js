import "./MyRecipe.scss";
import { getToken } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faClock,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Pagination/Pagination";
import Loading from "../../Loading/Loading";

function MyRecipe() {
  const [myRecipe, setMyRecipe] = useState([]);
  const [isReRender, setIsReRender] = useState(false);
  const [idRecipeDelete, setIdRecipeDelete] = useState();
  const [userHeader, setUserHeader] = useState("Công thức của tôi");
  const token = getToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const limitItemInPage = 8;

  const receiveValuePagination = (curPage) => {
    setCurrentPage(curPage);
  };

  const handleDeleteRecipeCollection = (e, idDelete) => {
    e.preventDefault();
    setIdRecipeDelete(idDelete);
  };

  const cancelDeleteRecipeCollection = () => {
    setIdRecipeDelete(0);
  };

  const confirmDeleteRecipeCollection = () => {
    setIsLoading(true);
    async function deleteRecipe() {
      await recipeApi
        .deleteRecipe(token, idRecipeDelete)
        .then((res) => {
          setIdRecipeDelete(0);
          setIsReRender((prevState) => !prevState);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
    deleteRecipe();
  };

  useEffect(() => {
    async function getMyRecipe() {
      await recipeApi
        .getMyRecipe(token)
        .then((res) => {
          setMyRecipe([...res.data.myListRecipe]);
          setIsLoading(false);
        })
        .catch((err) => console.log("F: ", err));
    }
    getMyRecipe();
  }, [isReRender]);
  return (
    <>
      {isLoading && <Loading />}
      <h3 className="user-header">{userHeader}</h3>
      <div className="collection-display-container">
        <Link
          to={`/create-recipe`}
          className="btn btn-info create-recipe-button"
        >
          <FontAwesomeIcon icon={faCirclePlus} className="me-1" />
          <span>Tạo công thức</span>
        </Link>
        <div className="container">
          <div className="row">
            {myRecipe
              .slice(
                (currentPage - 1) * limitItemInPage,
                currentPage * limitItemInPage
              )
              .map((recipe) => {
                return (
                  <div className="col-xl-4 col-md-6 col-12" key={recipe.id}>
                    <div className="collection-recipe-container">
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="collection-recipe-wrapper"
                      >
                        <span
                          className="collection-recipe-delete-icon"
                          onClick={(e) =>
                            handleDeleteRecipeCollection(e, recipe.id)
                          }
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
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
                            <p>Khẩu phần ăn: {recipe.amount_of_people} người</p>
                          </div>
                        </div>
                      </Link>
                      <p className="collection-recipe-short-des">
                        {recipe.short_description}
                      </p>
                      <Link
                        to={`/update-recipe/${recipe.id}`}
                        className="my-recipe-update-button"
                      >
                        <button className="btn btn-success">
                          Sửa công thức
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            <div
              className={`delete-recipe-collection-confirm-notice ${
                idRecipeDelete ? "is-display" : ""
              }`}
            >
              <p>
                Bạn có chắc chắn muốn xóa công thức này khỏi bộ sưu tập không ?
              </p>
              <div className="delete-recipe-collection-button-action">
                <button
                  className="btn btn-light"
                  onClick={cancelDeleteRecipeCollection}
                >
                  Không
                </button>
                <button
                  className="btn btn-primary"
                  onClick={confirmDeleteRecipeCollection}
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {myRecipe[0] && (
        <Pagination
          itemArray={myRecipe}
          limitItemInPage={limitItemInPage}
          passValuePagination={receiveValuePagination}
          currentPagePass={currentPage}
        />
      )}
    </>
  );
}

export default MyRecipe;
