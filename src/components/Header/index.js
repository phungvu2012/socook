import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareCaretDown,
  faBell,
  faStickyNote,
} from "@fortawesome/free-regular-svg-icons";

import styles from "./header.module.scss";
import logo from "./../../assets/image/logo/Logo_SoCook_vertical_3.png";
import avatar from "./../../assets/image/login/pexels-pixabay-357573.jpg";
import {
  getUser,
  removeUserSession,
  getToken,
} from "./../../features/sessionStorage";
import { useRef, useState, useEffect } from "react";

import searchApi from "../../api/searchApi";
import homePage from "../../api/homePageApi";
import Notification from "./Notification/Notification";

const Header = () => {
  const [suggestionSearch, setSuggestionSearch] = useState([]);
  const [keyword, setKeyword] = useState("");
  const searchInput = useRef();
  const navigate = useNavigate();
  const allPopUp = document.getElementsByClassName(styles.popUp);
  const [isDisplayAdvanceSearch, setIsDisplayAdvanceSearch] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const [userInfo, setUserInfo] = useState();
  const token = getToken();

  useEffect(() => {
    setUserInfo(getUser());
    if (token) {
      homePage
        .getNotificationList(token)
        .then((res) => {
          const mapData = res.data.data.map((notification) => {
            if (notification.type === "đăng bài viết mới") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã đăng bài viết mới`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "follow") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã theo dõi bạn`,
                urlRedirect: `/user-page/${notification.create_user_name}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "comment") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã bình luận bài viết của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "like") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã thích bài viết của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "likeComment") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã thích bình luận của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "childcomment") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã trả lời bình luận của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
            if (notification.type === "từ chối bài viết") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã từ chối duyệt bài viết của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }

            if (notification.type === "duyệt bài viết") {
              return {
                id: notification.id,
                avatar: notification.avatar_image,
                notiContent: `${notification.create_user_name} đã duyệt bài viết của bạn`,
                urlRedirect: `/recipe/${notification.recipe_id}`,
                time: new Date(notification.create_time),
                isView: notification.is_viewed,
              };
            }
          });
          setNotificationList([...mapData.reverse()]);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const hanlePopup = (event) => {
    const element = event.currentTarget;
    const popUp = element.querySelector(`.${styles.popUp}`);
    for (let item of allPopUp) {
      if (item.classList && item !== popUp) item.classList.remove("d-block");
    }
    if (popUp) popUp.classList.toggle("d-block");
  };

  const preprocessingSearchSuggestions = (searchSuggetions) => {
    return searchSuggetions
      .map((ele) => {
        ele = ele.trim();
        return ele.charAt(0).toUpperCase() + ele.substring(1).toLowerCase();
      })
      .filter(function (value, index, array) {
        return array.indexOf(value) === index;
      });
  };

  const handleSuggestionSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    if (e.target.value) {
      searchApi
        .getSearchSuggestions(e.target.value)
        .then((res) => {
          setSuggestionSearch([...preprocessingSearchSuggestions(res.data)]);
        })
        .catch((err) => console.log(err));
    } else {
      setSuggestionSearch([]);
    }
  };

  const handleSubmitSearchKeyword = (e) => {
    e.preventDefault();
    navigate(`search/${keyword}`);
    setKeyword("");
    setSuggestionSearch([]);
  };

  const handleResetInput = () => {
    setKeyword("");
    setSuggestionSearch([]);
    setIsDisplayAdvanceSearch(false);
  };

  const handleFocusInputSearch = () => {
    setIsDisplayAdvanceSearch(true);
  };

  const handleCloseAdvanceSearch = () => {
    setIsDisplayAdvanceSearch(false);
  };

  const setViewAllNotification = (e) => {
    e.preventDefault();
    e.stopPropagation();
    homePage
      .setViewAllNotification(token)
      .then((res) => {
        notificationList?.map((notification) => (notification.isView = 1));
        setRenderPage((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const filterNotification = (arr) => {
    if (filterValue === "notview") {
      return arr?.filter((ele) => ele.isView === 0);
    } else if (filterValue === "viewed") {
      return arr?.filter((ele) => ele.isView === 1);
    } else {
      return arr;
    }
  };

  return (
    <header className={styles.header}>
      <div className="container-lg">
        <div className="row align-items-center">
          <div className="col-12 col-md">
            <div className={styles.headerLeft}>
              <Link to="/" className={styles.headerLeft__Logo}>
                <img
                  src={logo}
                  alt="socook logo"
                  className={styles.logoImage}
                />
              </Link>
              <div className={styles.headerLeft__Search}>
                <form
                  className={styles.formSearch}
                  onSubmit={handleSubmitSearchKeyword}
                >
                  <input
                    type="text"
                    value={keyword}
                    className={styles.formSearch__Input}
                    onChange={handleSuggestionSearch}
                    ref={searchInput}
                    onFocus={handleFocusInputSearch}
                  />

                  <button className={styles.formSearch__Btn}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className={styles.formSearch__Icon}
                    />
                  </button>
                </form>
                <ul className={styles.suggestionSearchResult}>
                  {isDisplayAdvanceSearch && (
                    <li className={styles.suggestionSearchItem}>
                      <Link
                        to="/advance-search"
                        onClick={handleResetInput}
                        className={styles.advanceSearch}
                      >
                        <span>Tìm kiếm nâng cao...</span>
                        <FontAwesomeIcon
                          icon={faXmark}
                          className={styles.advanceSearchCloseIcon}
                          onClick={handleCloseAdvanceSearch}
                        />
                      </Link>
                    </li>
                  )}
                  {suggestionSearch.slice(0, 10).map((suggestion, index) => {
                    return (
                      <li key={index} className={styles.suggestionSearchItem}>
                        <Link
                          to={`search/${suggestion}`}
                          onClick={handleResetInput}
                        >
                          {suggestion}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md">
            <div className={styles.headerRight}>
              <div className={styles.feature}>
                {userInfo && (
                  <div className={styles.featureItem} onClick={hanlePopup}>
                    <div className={styles.featureItem__IconBox}>
                      <FontAwesomeIcon
                        icon={faSquareCaretDown}
                        className={styles.featureItem__Icon}
                      />
                    </div>
                    <div
                      className={`${styles.popUp} ${styles.popUp__Auto} ${styles.popUp__Square}`}
                    >
                      <Link
                        to="/login"
                        className={styles.popUp__SettingItem}
                        onClick={removeUserSession}
                      >
                        <div className={styles.popUp__SettingIcon}>
                          <FontAwesomeIcon icon={faRightFromBracket} />
                        </div>
                        <div className={styles.popUp__SettingContent}>
                          <h5 className={`${styles.popUp__SettingTitle} m-0`}>
                            Đăng xuất
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
                <div className={styles.featureItem} onClick={hanlePopup}>
                  <div className={styles.featureItem__IconBox}>
                    <FontAwesomeIcon
                      icon={faBell}
                      className={styles.featureItem__Icon}
                    />
                    {notificationList?.filter((noti) => noti?.isView === 0)
                      ?.length > 0 && (
                      <span>
                        {
                          notificationList?.filter((noti) => noti?.isView === 0)
                            ?.length
                        }
                      </span>
                    )}
                  </div>
                  <div
                    className={`${styles.popUp} ${
                      notificationList?.length > 3
                        ? styles.notificationScrollY
                        : ""
                    }`}
                  >
                    <div className={styles.notificationHeader}>
                      <h5>Thông báo</h5>
                      <span onClick={setViewAllNotification}>
                        Đánh dấu tất cả đã đọc
                      </span>
                    </div>
                    <div className={styles.notificationFilter}>
                      <button
                        className={
                          filterValue === "all" ?
                          styles.notificationFilter_active : ""
                        }
                        onClick={() => setFilterValue("all")}
                      >
                        Tất cả
                      </button>
                      <button
                        className={
                          filterValue === "notview" ?
                          styles.notificationFilter_active : ""
                        }
                        onClick={() => setFilterValue("notview")}
                      >
                        Chưa đọc
                      </button>
                      <button
                        className={
                          filterValue === "viewed" ?
                          styles.notificationFilter_active : ""
                        }
                        onClick={() => setFilterValue("viewed")}
                      >
                        Đã đọc
                      </button>
                    </div>
                    {filterNotification(notificationList).map(
                      (notification, index) => {
                        return (
                          <Notification
                            notification={notification}
                            key={index}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
                <div className={styles.featureItem} onClick={hanlePopup}>
                  <div className={styles.featureItem__IconBox}>
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      className={styles.featureItem__Icon}
                    />
                  </div>
                  <div className={`${styles.popUp} ${styles.popUp__Auto}`}>
                    <a href="#" className={styles.popUp__Item}>
                      <div className={styles.popUp__CollectionAvatar}>
                        <img src={avatar} className={styles.popUp__Image} />
                      </div>
                      <div className={styles.popUp__Message}>
                        <h5 className={styles.popUp__CollectionTitle}>Love</h5>
                        <p></p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {userInfo ? (
                <Link to="/user" className={styles.userAvatar}>
                  <div
                    className={styles.userAvatar__ImageBox}
                    style={{
                      backgroundImage: `url(${userInfo?.avatar_image})`,
                    }}
                  ></div>
                  <p className={styles.userAvatar__Name}>
                    {userInfo?.full_name}
                  </p>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={styles.userAvatar}
                  style={{ border: 0 }}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
