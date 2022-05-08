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

function MyRecipe() {
  const [myRecipe, setMyRecipe] = useState([]);
  const [isReRender, setIsReRender] = useState(false);
  const [idRecipeDelete, setIdRecipeDelete] = useState();
  const token = getToken();

  const handleDeleteRecipeCollection = (e, idDelete) => {
    e.preventDefault();
    console.log(idDelete);
    setIdRecipeDelete(idDelete);
  };

  const cancelDeleteRecipeCollection = () => {
    setIdRecipeDelete(0);
  };

  const confirmDeleteRecipeCollection = () => {
    async function deleteRecipe() {
      await recipeApi
        .deleteRecipe(token, idRecipeDelete)
        .then((res) => {
          console.log(res.data);
          setIdRecipeDelete(0);
          setIsReRender((prevState) => !prevState);
        })
        .catch((err) => console.log(err));
    }
    deleteRecipe();
  };

  useEffect(() => {
    async function getMyRecipe() {
      await recipeApi
        .getMyRecipe(token)
        .then((res) => {
          console.log(res.data.myListRecipe);
          setMyRecipe([...res.data.myListRecipe]);
        })
        .catch((err) => console.log("F: ", err));
    }
    getMyRecipe();
  }, [isReRender]);
  return (
    <div className="collection-display-container">
      <div className="container">
        <div className="row">
          {console.log("rerender because: ", idRecipeDelete)}
          {console.log(idRecipeDelete)}
          {myRecipe.map((recipe) => {
            return (
              <div className="col-3" key={recipe.id}>
                <div className="collection-recipe-container">
                  <Link to="/" className="collection-recipe-wrapper">
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
  );
}

export default MyRecipe;
