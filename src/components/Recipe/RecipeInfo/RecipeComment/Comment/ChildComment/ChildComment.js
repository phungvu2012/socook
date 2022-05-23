import './ChildComment.scss'
import { Link } from 'react-router-dom'

function ChildComment({childComment, convertTimeToDate}) {
  return (
    <div className="comment-wrapper">
      <Link
          to={`user-page/${childComment.user_name}`}
          className="comment-user-avatar"
        >
          <img src={childComment.avatar_image} alt="" />
        </Link>
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
      </div>
  )
}

export default ChildComment