import "./UserPage.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import userPageApi from "../../api/userPageApi";
import { getToken } from "../../features/sessionStorage";
import { getUser } from "../../features/sessionStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  const token = getToken();
  const userLoginInfo = getUser();
  const navigation = useNavigate();
  const { user_name } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [userCollections, setUserCollections] = useState();
  const [userRecipes, setUserRecipes] = useState();

  const handleFollowUser = (e) => {
    e.preventDefault();
    if (token) {
      if (userInfo.user_id !== userLoginInfo.user_id) {
        userPageApi
          .followUser(token, { followed_user_id: userInfo.user_id })
          .then((res) => {
            if (res.data.messageCode === 1) {
              setUserInfo({
                ...userInfo,
                countFollow: userInfo.countFollow + 1
              })
            }
          })
          .catch((err) => console.log("F: ", err));
      }
    } else {
      navigation("/login");
    }
  };

  useEffect(() => {
    userPageApi
      .getUserInfo(user_name)
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
                <button
                  className={`${
                    userInfo?.user_id === userLoginInfo?.user_id
                      ? "disable-follow-button"
                      : ""
                  }`}
                  onClick={handleFollowUser}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  Theo dõi
                </button>
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
