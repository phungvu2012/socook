import "./UserPage.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userPageApi from "../../api/userPageApi";
import { getToken } from "../../features/sessionStorage";
import { getUser } from "../../features/sessionStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCheck,
  faInfo,
  faCircleUser,
  faCity,
  faMarsAndVenus,
} from "@fortawesome/free-solid-svg-icons";
import RecipeSearchResult from "./../SearchPage/RecipeSearchResult/RecipeSearchResult";
import CollectionsSearchResult from "../SearchPage/CollectionSearchResult/CollectionSearchResult";

function UserPage() {
  const token = getToken();
  const userLoginInfo = getUser();
  const navigation = useNavigate();
  const { user_name } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [userCollections, setUserCollections] = useState();
  const [userRecipes, setUserRecipes] = useState();
  const [isInteract, setInteract] = useState(false);
  const [activeTab, setActiveTab] = useState("recipe");
  const [isInteractionCollection, setIsInteractionCollection] = useState(false);

  const handleFollowUser = (e) => {
    e.preventDefault();
    if (token) {
      userPageApi
        .followUser(token, { followed_user_id: userInfo.user_id })
        .then((res) => {
          if (res.data.messageCode === 1) {
            setInteract((prev) => !prev);
          }
        })
        .catch((err) => console.log("F: ", err));
    } else {
      navigation("/login");
    }
  };

  const handleUnfollowUser = (e) => {
    e.preventDefault();
    userPageApi
      .unfollowUser(token, { followed_user_id: userInfo.user_id })
      .then((res) => {
        if (res.data.messageCode === 1) {
          setInteract((prev) => !prev);
        }
      })
      .catch((err) => console.log("F: ", err));
  };

  useEffect(() => {
    userPageApi
      .getUserInfo(token, user_name)
      .then((res) => {
        setUserInfo({ ...res.data.user });
      })
      .catch((err) => console.log("F: ", err));
    userPageApi
      .getUserCollections(user_name)
      .then((res) => {
        setUserCollections([...res.data]);
      })
      .catch((err) => console.log(err));
    userPageApi
      .getUserRecipes(user_name)
      .then((res) => {
        setUserRecipes([...res.data.userListRecipe]);
      })
      .catch((err) => console.log(err));
  }, [user_name]);

  useEffect(() => {
    userPageApi
      .getUserInfo(token, user_name)
      .then((res) => {
        setUserInfo({ ...res.data.user });
      })
      .catch((err) => console.log("F: ", err));
  }, [isInteract]);

  useEffect(() => {
    userPageApi
      .getUserCollections(user_name)
      .then((res) => {
        setUserCollections([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [isInteractionCollection]);

  return (
    <div className="user-page-container">
      <div className="container">
        <div className="row">
          <div className="user-page-profile-header-container">
            <div className="user-page-profile-header-info">
              <img
                src={userInfo?.avatar_image}
                alt={`Avatar của ${userInfo?.full_name}`}
                className="user-page-profile-avatar"
              />
              <h5 className="user-page-profile-full-name">
                {userInfo?.full_name}
              </h5>
              <div className="user-page-profile-amount-follow">
                <span>Số người theo dõi: </span>
                <span>{userInfo?.countFollow}</span>
              </div>
              <div className="user-page-profile-amount-recipe">
                <span>Số lượng công thức: </span>
                <span>{userRecipes?.length}</span>
              </div>
              <div className="user-page-follow-button">
                {userInfo?.user_id === userLoginInfo?.user_id ? (
                  <button className="disable-follow-button">
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                    Theo dõi
                  </button>
                ) : userInfo?.followed ? (
                  <button onClick={handleUnfollowUser}>
                    <FontAwesomeIcon icon={faCheck} className="me-1" />
                    Đã theo dõi
                  </button>
                ) : (
                  <button onClick={handleFollowUser}>
                    <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                    Theo dõi
                  </button>
                )}
              </div>
            </div>
            <div
              className="user-page-profile-header-background-image"
            >
              <img src={userInfo?.cover_image} alt="Background" />
            </div>
          </div>

          <div className="user-page-detail-container">
            <div className="container">
              <div className="row">
                <div className="user-page-detail-nav-tab-wrapper">
                  <span
                    className={`user-page-detail-nav-tab-item ${
                      activeTab === "recipe" ? "user-page-nav-tab--active" : ""
                    }`}
                    data-value="recipe"
                    onClick={(e) => setActiveTab(e.target.dataset.value)}
                  >
                    Công thức ({userRecipes?.length || 0})
                  </span>
                  <span
                    className={`user-page-detail-nav-tab-item ${
                      activeTab === "collection"
                        ? "user-page-nav-tab--active"
                        : ""
                    }`}
                    data-value="collection"
                    onClick={(e) => setActiveTab(e.target.dataset.value)}
                  >
                    Bộ sưu tập ({userCollections?.length || 0})
                  </span>
                  <span
                    className={`user-page-detail-nav-tab-item ${
                      activeTab === "userInfo"
                        ? "user-page-nav-tab--active"
                        : ""
                    }`}
                    data-value="userInfo"
                    onClick={(e) => setActiveTab(e.target.dataset.value)}
                  >
                    Thông tin cá nhân
                  </span>
                </div>
                {console.log(userRecipes)}
                <div className="user-page-detail-content">
                  <div className="container">
                    <div className="row">
                      {activeTab === "recipe" ? (
                        userRecipes?.map((recipe) => {
                          return (
                            <div className="col-2" key={recipe.id}>
                              <RecipeSearchResult
                                recipe={{
                                  ...recipe,
                                  user_name,
                                }}
                              />
                            </div>
                          );
                        })
                      ) : activeTab === "collection" ? (
                        userCollections?.map((collection) => {
                          return (
                            <div className="col-2" key={collection.id}>
                              <CollectionsSearchResult
                                collection={collection}
                                setIsInteractionCollection={
                                  setIsInteractionCollection
                                }
                                isInteractionCollection={
                                  isInteractionCollection
                                }
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="user-page-user-info">
                          {console.log("U:", userInfo)}
                          <div className="user-page-user-info-field">
                            <span>
                              <FontAwesomeIcon
                                icon={faInfo}
                                className="me-1 user-page-user-info-field-icon"
                              />
                              Giới thiệu:
                            </span>
                            <p>{userInfo.introduction}</p>
                          </div>
                          <div className="user-page-user-info-field">
                            <span>
                              <FontAwesomeIcon
                                icon={faCircleUser}
                                className="me-1 user-page-user-info-field-icon"
                              />
                              Họ tên:
                            </span>
                            <p>{userInfo.full_name}</p>
                          </div>
                          <div className="user-page-user-info-field">
                            <span>
                              <FontAwesomeIcon
                                icon={faCity}
                                className="me-1 user-page-user-info-field-icon"
                              />
                              Tỉnh/Thành phố:
                            </span>
                            <p>{userInfo.city}</p>
                          </div>
                          <div className="user-page-user-info-field">
                            <span>
                              <FontAwesomeIcon
                                icon={faMarsAndVenus}
                                className="me-1 user-page-user-info-field-icon"
                              />
                              Giới tính:
                            </span>
                            <p>
                              {userInfo.gender === 0
                                ? "Nam"
                                : userInfo.gender === 1
                                ? "Nữ"
                                : "Khác"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
