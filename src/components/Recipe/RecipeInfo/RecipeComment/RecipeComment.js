import "./RecipeComment.scss";
import recipeApi from "../../../../api/recipeApi";
import Comment from "./Comment/Comment";
import {getToken} from './../../../../features/sessionStorage'
import { useEffect, useState } from "react";

function RecipeComment({ recipeId }) {
  const token = getToken()
  const [recipeComment, setRecipeComment] = useState([]);
  const [commentValue, setCommentValue] = useState('')
  useEffect(() => {
    recipeApi
      .getRecipeComment(recipeId, token)
      .then((res) => {
        setRecipeComment(res.data.comment);
      })
      .catch((err) => console.log(err));
  }, [recipeId]);

  return (
    <div className="recipe-comment-container">
      <h5>Bình luận ({recipeComment.length})</h5>
      <div className="recipe-comment-input-wrapper">
        <textarea className="recipe-comment-input" placeholder="Viết bình luận ..." rows="3" onChange={(e) => setCommentValue(e.target.value)}></textarea>
        <div className={`recipe-comment-input-submit-button ${commentValue ? "recipe-comment-input-submit-button--active" : ""}`}>
          <button>Đăng</button>
        </div>
      </div>
      <div className="recipe-comment-wrapper">
        {
          recipeComment?.map(comment => (
            <Comment comment={comment} key={comment.id}/>
          ))
        }
      </div>
      {console.log("Cmt: ", recipeComment)}
    </div>
  );
}

export default RecipeComment;
