import "./RecipeComment.scss";
import recipeApi from "../../../../api/recipeApi";
import Comment from "./Comment/Comment";
import { getToken } from "./../../../../features/sessionStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeComment({ recipeId }) {
  const token = getToken();
  const navigate = useNavigate();
  const [recipeComment, setRecipeComment] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [isGetCommentList, setIsGetCommentList] = useState(false);
  const [sortCondition, setSortCondition] = useState("newest");

  const handlePostComment = (e) => {
    e.preventDefault();
    if (token) {
      const formData = new FormData();
      formData.append("recipe_id", recipeId);
      formData.append("content", commentValue);
      recipeApi
        .createComment(token, formData)
        .then((res) => {
          console.log("S:", res);
          setIsGetCommentList((prev) => !prev);
          setCommentValue("");
        })
        .catch((err) => console.log("F:", err));
    } else {
      navigate("/login");
    }
  };

  const handleCancelPostComment = (e) => {
    e.preventDefault();
    setCommentValue("");
  };

  const sortComment = (commentArray) => {
    if(sortCondition === "newest") {
      const tempCommentList = [...commentArray];
      tempCommentList.reverse();
      return tempCommentList;
    }
    if(sortCondition === "helpful") {
      const tempCommentList = [...commentArray]
      tempCommentList.sort((a, b) => b.like - a.like)
      return tempCommentList
    } 
    return commentArray
  };

  useEffect(() => {
    recipeApi
      .getRecipeComment(recipeId, token)
      .then((res) => {
        setRecipeComment(res.data.comment);
      })
      .catch((err) => console.log(err));
  }, [recipeId, isGetCommentList]);

  return (
    <div className="recipe-comment-container">
      <div className="recipe-comment-sort">
        <h5>Bình luận ({recipeComment.length})</h5>
        <div className="recipe-comment-sort-area">
          Sắp xếp theo:
          <select
            value={sortCondition}
            onChange={(e) => setSortCondition(e.target.value)}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="helpful">Hữu ích</option>
          </select>
        </div>
      </div>
      <div className="recipe-comment-input-wrapper">
        <textarea
          className="recipe-comment-input"
          placeholder="Viết bình luận ..."
          rows="3"
          onChange={(e) => setCommentValue(e.target.value)}
          value={commentValue}
        ></textarea>
        <div
          className={`recipe-comment-input-submit-button ${
            commentValue ? "recipe-comment-input-submit-button--active" : ""
          }`}
        >
          <button
            className="recipe-comment-input-button-cancel"
            onClick={handleCancelPostComment}
          >
            Hủy
          </button>
          <button
            className="recipe-comment-input-button-post"
            onClick={handlePostComment}
          >
            Đăng
          </button>
        </div>
      </div>
      <div className="recipe-comment-wrapper">
        {sortComment(recipeComment)?.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
      {console.log("Cmt: ", recipeComment)}
    </div>
  );
}

export default RecipeComment;
