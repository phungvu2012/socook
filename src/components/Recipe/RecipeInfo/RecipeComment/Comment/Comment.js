import "./Comment.scss";
import recipeApi from "../../../../../api/recipeApi";
import ChildComment from "./ChildComment/ChildComment";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../../../../features/sessionStorage";
import { getUser } from "../../../../../features/sessionStorage";
import { useState } from "react";
import ReportInput from "../../../../ReportInput/ReportInput";

function Comment({ comment, isGetCommentList, setIsGetCommentList, isAdmin }) {
  const token = getToken();
  const userInfo = getUser();
  const navigate = useNavigate();
  const [renderCommentVariable, setRenderCommentVariable] = useState(false);
  const [isDisplayCommentAction, setIsDisplayCommentAction] = useState(false);
  const [isUpdateComment, setIsUpdateComment] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [isDeleteComment, setIsDeleteComment] = useState(false);
  const [isReplyComment, setIsReplyComment] = useState(false);
  const [replyCommentValue, setReplyCommentValue] = useState("");

  const [idCommentReport, setIdCommentReport] = useState(0);

  const handleGetIdRecipeReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIdCommentReport(comment.id);
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
    const formData = new FormData();
    formData.append("id", comment.id);
    formData.append("content", commentValue);
    recipeApi
      .updateComment(token, formData)
      .then((res) => {
        comment.content = commentValue;
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
      .deleteComment(token, comment.id)
      .then((res) => {
        setIsDeleteComment(false);
        setIsGetCommentList(!isGetCommentList);
      })
      .catch((err) => console.log(err));
  };

  const handlePostChildComment = (e) => {
    e.preventDefault();
    if (token) {
      const commentObj = {
        parent_id: comment.id,
        content: replyCommentValue,
      };
      recipeApi
        .createChildComment(token, commentObj)
        .then((res) => {
          console.log(res);
          setReplyCommentValue("");
          setIsGetCommentList((prev) => !prev);
          setIsReplyComment(false);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };

  const convertTimeToDate = (str) => {
    let date = new Date(str);
    let milisecond = Date.now() - date;
    if (milisecond >= 86400000) {
      let day = Math.floor(milisecond / 86400000);
      if (day >= 365) {
        return `${Math.floor(day / 365)} năm`;
      } else if (day >= 7) {
        return `${Math.floor(day / 7)} tuần`;
      } else if (day > 0) {
        return `${day} ngày`;
      }
    } else {
      let time = Math.floor(milisecond / 1000);
      if (time >= 3600) {
        return `${Math.floor(time / 3600)} giờ`;
      } else if (time >= 60) {
        return `${Math.floor(time / 60)} phút`;
      } else {
        return `${time} giây`;
      }
    }
  };

  const triggerRenderParentComment = (idDeleteChildComment) => {
    comment.childComment = comment.childComment.filter(
      (childComment) => childComment.id !== idDeleteChildComment
    );
    setRenderCommentVariable((prev) => !prev);
  };

  const handleLikeComment = () => {
    if (token) {
      if (comment.liked) {
        recipeApi
          .dislikeComment(token, comment.id)
          .then((res) => {
            comment.like--;
            comment.liked = 0;
            setRenderCommentVariable((prev) => !prev);
          })
          .catch((err) => console.log(err));
      } else {
        recipeApi
          .likeComment(token, comment.id)
          .then((res) => {
            comment.like++;
            comment.liked = 1;
            setRenderCommentVariable((prev) => !prev);
          })
          .catch((err) => console.log(err));
      }
    } else {
      navigate("/login");
    }
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
          to={`/user-page/${comment.user_name}`}
          className="comment-user-avatar"
        >
          <img src={comment.avatar_image} alt={comment.user_name} />
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
                <Link to={`/user-page/${comment.user_name}`}>
                  {comment.user_name}
                </Link>
              </span>
              <p className="comment-content">{comment.content}</p>
              <div className="comment-interaction">
                <span className="comment-interaction-like">
                  {comment.liked ? (
                    <FontAwesomeIcon
                      icon={faThumbsUpSolid}
                      className="comment-interaction-like-icon"
                      onClick={handleLikeComment}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="comment-interaction-like-icon"
                      onClick={handleLikeComment}
                    />
                  )}
                  {comment.like}
                </span>
                <span
                  className="comment-interaction-reply"
                  onClick={() => setIsReplyComment(true)}
                >
                  Trả lời
                </span>
                <span className="comment-interaction-date">
                  {convertTimeToDate(comment.create_time)}
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
                  {isAdmin && userInfo?.user_id !== comment.user_id ? (
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
                  ) : userInfo?.user_id === comment.user_id ? (
                    <>
                      <li
                        className="comment-actions-update"
                        onClick={(e) => {
                          setIsUpdateComment(true);
                          setCommentValue(comment.content);
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
      <div className="child-comment-container">
        {isReplyComment && (
          <div className="comment-reply-container">
            <input
              type="text"
              value={replyCommentValue}
              onChange={(e) => setReplyCommentValue(e.target.value)}
            />
            <div className="comment-reply-button">
              <button
                className="comment-reply-button-cancel"
                onClick={() => setIsReplyComment(false)}
              >
                Hủy
              </button>
              <button
                className="comment-reply-button-post"
                onClick={handlePostChildComment}
              >
                Trả lời
              </button>
            </div>
          </div>
        )}

        {comment.childComment[0] &&
          comment.childComment.map((childComment) => (
            <ChildComment
              childComment={childComment}
              key={childComment.id}
              convertTimeToDate={convertTimeToDate}
              renderCommentVariable={renderCommentVariable}
              triggerRenderParentComment={triggerRenderParentComment}
              isAdmin={isAdmin}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
