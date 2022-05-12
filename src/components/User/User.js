import { useEffect, useState } from "react";
import "./User.scss";
import userApi from "../../api/userApi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getToken } from "./../../features/sessionStorage";
import { getUser } from "./../../features/sessionStorage";
import { setUserSession } from "./../../features/sessionStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faUser,
  faLock,
  faFilePen,
  faBookmark,
  faImage,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import CoverImage from "./CoverImage/CoverImage";

function User() {
  const token = getToken();
  const location = useLocation();
  window.onpopstate = () => {
    console.log("back");
    setUserHeader(mapUserHeader(location.pathname.split("/").at(-1)));
  };
  const [userInfo, setUserInfo] = useState(getUser());
  const mapUserHeader = (header) => {
    switch (header) {
      case "cover-image":
        return "Ảnh bìa";
      case "change-password":
        return "Đổi mật khẩu";
      case "collection":
        return "Bộ sưu tập";
      case "my-recipe":
        return "Công thức của tôi";
      case "collection-save":
        return "Bộ sưu tập đã lưu";
      default:
        return "Thông tin cá nhân";
    }
  };
  const [userHeader, setUserHeader] = useState(
    mapUserHeader(location.pathname.split("/").at(-1))
  );
  const handleChangeAvatar = (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    userApi
      .changeAvatar(token, fd)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data);
          setUserSession(token, res.data.user);
          setUserInfo({ ...getUser() });
        }
      })
      .catch((err) => console.log("F: ", err));
  };
  return (
    <div className=" user-info-container">
      <div className="container">
        <div className="row">
          <div className="user-info-header-image">
            <div className="user-avatar">
              <label htmlFor="upload-avatar">
                <input
                  type="file"
                  id="upload-avatar"
                  onChange={handleChangeAvatar}
                />
                <img
                  id="avatar"
                  className="avatar"
                  src={userInfo.avatar_image}
                  alt="Avatar"
                ></img>
              </label>
              <span>{userInfo.full_name}</span>
            </div>
            <div className="user-info-cover-image">
              <CoverImage />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="user-info-sidebar">
              <div className="user-function">
                <div
                  className={`user-function-button ${
                    userHeader === "Thông tin cá nhân"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link to="user-info" className="user-function-button-link">
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faUser}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Thông tin cá nhân
                    </span>
                  </Link>
                </div>
                <div
                  className={`user-function-button ${
                    userHeader === "Đổi mật khẩu"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link
                    to="change-password"
                    className="user-function-button-link"
                  >
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faLock}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Đổi mật khẩu
                    </span>
                  </Link>
                </div>
                <div
                  className={`user-function-button ${
                    userHeader === "Bộ sưu tập"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link to="collection" className="user-function-button-link">
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faClipboardList}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Bộ sưu tập
                    </span>
                  </Link>
                </div>
                <div
                  className={`user-function-button ${
                    userHeader === "Công thức của tôi"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link to="my-recipe" className="user-function-button-link">
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faFilePen}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Công thức của tôi
                    </span>
                  </Link>
                </div>
                <div
                  className={`user-function-button ${
                    userHeader === "Bộ sưu tập đã lưu"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link
                    to="collection-save"
                    className="user-function-button-link"
                  >
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faBookmark}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Bộ sưu tập đã lưu
                    </span>
                  </Link>
                </div>
                <div
                  className={`user-function-button ${
                    userHeader === "Công thức đang chờ duyệt"
                      ? "user-function-button--active"
                      : ""
                  }`}
                >
                  <Link
                    to="recipe-pending"
                    className="user-function-button-link"
                  >
                    <FontAwesomeIcon
                      className="user-function-button-icon"
                      icon={faWater}
                    />
                    <span
                      onClick={(e) => {
                        setUserHeader(e.target.innerHTML);
                      }}
                    >
                      Công thức đang chờ duyệt
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-9">
            <div className="user-container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
