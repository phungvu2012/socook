import "./MyComment.scss";
import { getToken } from "../../../features/sessionStorage";
import userApi from "../../../api/userApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";

function MyComment() {
  const token = getToken();
  const [myComment, setMyComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    userApi
      .getMyComment(token)
      .then((res) => {
        setMyComment([...res.data.data.reverse()]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="my-comment-history-cotainer">
      {isLoading && <Loading />}
      <h5>Lịch sử bình luận</h5>
      {myComment?.map((comment) => {
        return (
          <Link
            to={`/recipe/${comment.recipe_id}`}
            className="my-comment-history-wrapper"
            key={comment.id}
          >
            <img
              src={comment.main_image_url}
              alt={comment.title}
              className="my-comment-history-image"
            />
            <div className="my-comment-history-content">
              <p>
                Bạn đã bình luận ở bài viết{" "}
                <span className="my-comment-history-title">
                  {comment.title}
                </span>
                . Nhấn vào để xem bài viết.
              </p>
              <span className="my-comment-history-time">
                {convertTimeToDate(comment.create_time)} trước
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default MyComment;
