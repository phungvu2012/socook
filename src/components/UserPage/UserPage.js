import "./UserPage.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userPageApi from "../../api/userPageApi";
import { getToken } from "../../features/sessionStorage";
import { getUser } from "../../features/sessionStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  const token = getToken();
  const userLoginInfo = getUser();
  const navigation = useNavigate();
  const { user_name } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [userCollections, setUserCollections] = useState();
  const [userRecipes, setUserRecipes] = useState();
  const [isInteract, setInteract] = useState(false);

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
        console.log(res);
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
        console.log(res);
        setUserInfo({ ...res.data.user });
      })
      .catch((err) => console.log("F: ", err));
  }, [isInteract]);

  return (
    <div className="user-page-container">
      {console.log("U: ", userInfo)}
      {console.log("C: ", userCollections)}
      {console.log("R: ", userRecipes)}
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
              style={{ backgroundImage: `url(${userInfo?.cover_image})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
