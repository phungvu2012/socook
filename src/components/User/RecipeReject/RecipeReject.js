import "./RecipeReject.scss";
import { getToken } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RecipeReject() {
  const token = getToken();
  const navigate = useNavigate();
  const [recipeRejectList, setRecipeRejectList] = useState([]);
  const [isDeleteRecipe, setIsDeleteRecipe] = useState(0);
  const [isGetRejectRecipeList, setIsGetRejectRecipeList] = useState(false);

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
    recipeApi
      .deleteRecipe(token, isDeleteRecipe)
      .then((res) => {
        setIsDeleteRecipe(0);
        setIsGetRejectRecipeList((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const cancelDeleteRecipeCollection = () => {
    setIsDeleteRecipe(0);
  };

  useEffect(() => {
    recipeApi
      .getMyRejectRecipe(token)
      .then((res) => {
        setRecipeRejectList([...res.data.data]);
      })
      .catch((err) => console.log(err));
  }, [isGetRejectRecipeList]);
  return (
    <div className="pending-recipe-container">
      <h5>Công thức bị từ chối</h5>
      <div className="pending-recipe-wrapper">
        <div className="reject-recipe-info">
          <span className="reject-recipe-title">Tên công thức</span>
          <span className="reject-recipe-reason reject-recipe-reason-header">Lý do từ chối</span>
        </div>
      </div>
      {recipeRejectList?.map((recipe) => {
        return (
          <Link
            to={`/recipe/${recipe.id}`}
            className="pending-recipe-wrapper"
            key={recipe.id}
          >
            <div className="reject-recipe-info">
              <span className="reject-recipe-title">{recipe.title}</span>
              <span className="reject-recipe-reason">{recipe.reason}</span>
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

export default RecipeReject;
