import "./CoverImage.scss";
import { useState } from "react";
import { getUser } from "../../../features/sessionStorage";
import userApi from "../../../api/userApi";
import { getToken } from "../../../features/sessionStorage";
import { setUserSession } from "../../../features/sessionStorage";

function CoverImage() {
  const [userInfo, setUserInfo] = useState(getUser());
  const token = getToken();

  const handleChangeCoverImage = (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    userApi
      .changeCoverImage(token, fd)
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
    <div className="user-cover-image">
      <p>Nhấp vào ảnh để thay đổi ảnh bìa</p>
      <label htmlFor="user-cover-image-input">
        <img src={userInfo.cover_image} alt="Cover" id="user-cover-image" />
        {console.log(userInfo)}
        <input
          type="file"
          id="user-cover-image-input"
          onChange={handleChangeCoverImage}
        />
      </label>
    </div>
  );
}

export default CoverImage;
