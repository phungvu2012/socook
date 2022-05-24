import "./Comment.scss";
import recipeApi from "../../../../../api/recipeApi";
import ChildComment from "./ChildComment/ChildComment";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../../../../features/sessionStorage";
import { useState } from "react";

function Comment({ comment }) {
  const token = getToken()
  const [renderCommentVariable, setRenderCommentVariable] = useState(false)
  const navigate = useNavigate()
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

  const handleLikeComment = () => {
    if(token) {
      if(comment.liked) {
        recipeApi.dislikeComment(token, comment.id)
        .then(res => {
          console.log(res)
          comment.like--
          comment.liked=0
          setRenderCommentVariable(prev => !prev)
        })
        .catch(err => console.log(err))
      } else {
        recipeApi.likeComment(token, comment.id)
        .then(res => {
          console.log(res)
          comment.like++
          comment.liked=1
          setRenderCommentVariable(prev => !prev)
        })
        .catch(err => console.log(err))
      }
    } else {
      navigate("/login")
    }
  }
  return (
    <div className="comment-container">
      <div className="comment-wrapper">
        <Link
          to={`/user-page/${comment.user_name}`}
          className="comment-user-avatar"
        >
          <img src={comment.avatar_image} alt="" />
        </Link>
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
            <span className="comment-interaction-reply">Trả lời</span>
            <span className="comment-interaction-date">
              {convertTimeToDate(comment.create_time)}
            </span>
          </div>
        </div>
      </div>
      <div className="child-comment-container">
        {comment.childComment[0] &&
          comment.childComment.map((childComment) => (
            <ChildComment
              childComment={childComment}
              key={childComment.id}
              convertTimeToDate={convertTimeToDate}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
