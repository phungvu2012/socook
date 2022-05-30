import styles from "./../header.module.scss";
import "./Notification.scss";
import { getToken } from "../../../features/sessionStorage";
import homePage from "../../../api/homePageApi";
import { useNavigate } from "react-router-dom";

function Notification({ notification }) {
  const token = getToken();
  const navigate = useNavigate();

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

  const handleRedirectNotification = (id, url) => {
    homePage
      .setViewNotification(token, id)
      .then((res) => {
        notification.isView = 1;
        navigate(url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <span
      className={`${styles.popUp__Item} + ${
        notification?.isView ? "" : "notification-not-view"
      }`}
      onClick={() =>
        handleRedirectNotification(notification?.id, notification?.urlRedirect)
      }
    >
      <div className={styles.popUp__Avatar}>
        <img
          src={notification?.avatar}
          alt={notification?.notiContent}
          className={styles.popUp__Image}
        />
      </div>
      <div className={styles.popUp__Message}>
        <p className={styles.popUp__MessageContent}>
          {notification?.notiContent}
        </p>
        <p className="notification-time">
          {convertTimeToDate(notification?.time)} trước
        </p>
      </div>
    </span>
  );
}

export default Notification;
