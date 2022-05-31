import "./RecipePending.scss";
import recipeApi from "../../../api/recipeApi";
import { getToken } from "../../../features/sessionStorage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

function RecipePending() {
  const token = getToken();
  const navigate = useNavigate();
  const [header, setHeader] = useState("Công thức đang chờ duyệt");
  const [recipePendingList, setRecipePendingList] = useState([]);
  const [isDeleteRecipe, setIsDeleteRecipe] = useState(0);
  const [isGetPendingRecipeList, setIsGetPendingRecipeList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const convertTimeToDate = (str) => {
    let date = new Date(str);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const handleDeleteRecipe = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteRecipe(id);
  };

  const handleUpdateRecipe = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/update-recipe/${id}`);
  };

  const confirmDeletePendingRecipe = () => {
    setIsLoading(true);
    recipeApi
      .deleteRecipe(token, isDeleteRecipe)
      .then((res) => {
        setIsDeleteRecipe(0);
        setIsGetPendingRecipeList((prev) => !prev);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const cancelDeleteRecipeCollection = () => {
    setIsDeleteRecipe(0);
  };

  useEffect(() => {
    recipeApi
      .getMyPendingRecipe(token)
      .then((res) => {
        setRecipePendingList([...res.data.waitRecipe]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [isGetPendingRecipeList]);
  return (
    <div className="pending-recipe-container">
      {isLoading && <Loading />}
      <h5>{header}</h5>
      {recipePendingList?.map((recipe) => {
        return (
          <Link
            to={`/recipe/${recipe.id}`}
            className="pending-recipe-wrapper"
            key={recipe.id}
          >
            <div className="pending-recipe-info">
              <img
                src={recipe.main_image_url}
                alt={recipe.title}
                className="pending-recipe-main-img"
              />
              <span className="pending-recipe-title">{recipe.title}</span>
              <span className="pending-recipe-time-create">
                Tạo ngày {convertTimeToDate(recipe.create_time)}
              </span>
            </div>
            <div className="pending-recipe-action">
              <button
                className="pending-recipe-action-delete"
                onClick={(e) => handleDeleteRecipe(e, recipe.id)}
              >
                Xóa công thức
              </button>
              <button
                className="pending-recipe-action-update"
                onClick={(e) => handleUpdateRecipe(e, recipe.id)}
              >
                Sửa công thức
              </button>
            </div>
          </Link>
        );
      })}
      <div
        className={`delete-recipe-collection-confirm-notice ${
          isDeleteRecipe && "is-display"
        }`}
      >
        <p>Bạn có chắc chắn muốn xóa công thức này khỏi bộ sưu tập không ?</p>
        <div className="delete-recipe-collection-button-action">
          <button
            className="btn btn-light"
            onClick={cancelDeleteRecipeCollection}
          >
            Không
          </button>
          <button
            className="btn btn-primary"
            onClick={confirmDeletePendingRecipe}
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipePending;
