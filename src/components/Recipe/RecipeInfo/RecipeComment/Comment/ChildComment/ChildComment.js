import "./ChildComment.scss";
import { Link } from "react-router-dom";
import recipeApi from "../../../../../../api/recipeApi";
import { getToken } from "./../../../../../../features/sessionStorage";
import { getUser } from "./../../../../../../features/sessionStorage";
import { useState } from "react";
import ReportInput from "../../../../../ReportInput/ReportInput";

function ChildComment({
  childComment,
  convertTimeToDate,
  triggerRenderParentComment,
  isAdmin,
}) {
  const token = getToken();
  const userInfo = getUser();
  // const [renderCommentVariable, setRenderCommentVariable] = useState(false);
  const [isDisplayCommentAction, setIsDisplayCommentAction] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [idCommentReport, setIdCommentReport] = useState(0);

  const handleGetIdRecipeReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdCommentReport(childComment.id);
    setIsDisplayCommentAction(false);
  };

  const resetIdRecipeDelete = (data) => {
    console.log(data);
    setIdCommentReport(data);
  };
  const handleCancelUpdateComment = (e) => {
    setIsUpdateComment(false);
    setIsDisplayCommentAction(false);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    const commentObj = {
      child_comment_id: childComment.id,
      content: commentValue,
    };
    recipeApi
      .updateChildComment(token, commentObj)
      .then((res) => {
        childComment.content = commentValue;
        setIsUpdateComment(false);
        setIsDisplayCommentAction(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancelActionComment = (e) => {
    e.stopPropagation();
    setIsDisplayCommentAction(false);
  };

  const handleCancelDeleteComment = () => {
    setIsDeleteComment(false);
  };

  const handleDeleteComment = (e) => {
    recipeApi
      .deleteChildComment(token, childComment.id)
      .then((res) => {
        setIsDeleteComment(false);
        triggerRenderParentComment(childComment.id);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="comment-container">
      {idCommentReport ? (
        <ReportInput
          idReport={idCommentReport}
          typeReport="comment"
          resetIdDelete={resetIdRecipeDelete}
        />
      ) : (
        <></>
      )}
      {isDeleteComment && (
        <div>
          <div className="comment-delete-confirm">
            <p>Bạn có chắc chắn muốn xóa bình luận này không ?</p>
            <div className="comment-delete-confirm-button">
              <button
                className="comment-delete-confirm-button-cancel"
                onClick={handleCancelDeleteComment}
              >
                Hủy
              </button>
              <button
                className="comment-delete-confirm-button-delete"
                onClick={handleDeleteComment}
              >
                Xóa
              </button>
            </div>
          </div>
          <div className="comment-delete-confirm-overlay"></div>
        </div>
      )}
      <div className="comment-wrapper">
        <Link
          to={`user-page/${childComment.user_name}`}
          className="comment-user-avatar"
        >
          <img src={childComment.avatar_image} alt="" />
        </Link>
        {isUpdateComment ? (
          <div className="comment-content-update-container">
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
            <div
              className={`recipe-comment-input-submit-button ${
                commentValue ? "recipe-comment-input-submit-button--active" : ""
              }`}
            >
              <button
                className="recipe-comment-input-button-cancel"
                onClick={handleCancelUpdateComment}
              >
                Hủy
              </button>
              <button
                className="recipe-comment-input-button-post"
                onClick={handleUpdateComment}
              >
                Cập nhật
              </button>
            </div>
          </div>
        ) : (
          <div className="comment-content-container">
            <div className="comment-detail">
              <span className="comment-user-name">
                <Link to={`/user-page/${childComment.user_name}`}>
                  {childComment.user_name}
                </Link>
              </span>
              <p className="comment-content">{childComment.content}</p>
              <div className="comment-interaction">
                <span className="comment-interaction-date">
                  {convertTimeToDate(childComment.create_time)}
                </span>
              </div>
            </div>
            <div
              className="comment-action-wrapper"
              onClick={() => setIsDisplayCommentAction(true)}
            >
              <span>...</span>
              {isDisplayCommentAction && (
                <ul className="comment-actions">
                  <li
                    className="comment-actions-cancel"
                    onClick={handleCancelActionComment}
                  >
                    x
                  </li>
                  {isAdmin && userInfo?.user_id !== childComment.user_id ? (
                    <>
                      <li
                        className="comment-actions-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeleteComment(true);
                          setIsDisplayCommentAction(false);
                        }}
                      >
                        Xóa
                      </li>
                      <li
                        className="comment-actions-delete"
                        onClick={handleGetIdRecipeReport}
                      >
                        Báo cáo
                      </li>
                    </>
                  ) : userInfo?.user_id === childComment.user_id ? (
                    <>
                      <li
                        className="comment-actions-update"
                        onClick={(e) => {
                          setIsUpdateComment(true);
                          setCommentValue(childComment.content);
                        }}
                      >
                        Sửa
                      </li>
                      <li
                        className="comment-actions-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeleteComment(true);
                          setIsDisplayCommentAction(false);
                        }}
                      >
                        Xóa
                      </li>
                    </>
                  ) : (
                    <li
                      className="comment-actions-delete"
                      onClick={handleGetIdRecipeReport}
                    >
                      Báo cáo
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChildComment;
