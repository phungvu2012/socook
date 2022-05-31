import "./CoverImage.scss";
import { useState } from "react";
import { getUser } from "../../../features/sessionStorage";
import userApi from "../../../api/userApi";
import { getToken } from "../../../features/sessionStorage";
import { setUserSession } from "../../../features/sessionStorage";
import Loading from "../../Loading/Loading";

function CoverImage() {
  const [userInfo, setUserInfo] = useState(getUser());
  const [userHeader, setUserHeader] = useState("Ảnh bìa");
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();

  const handleChangeCoverImage = (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0]);
    setIsLoading(true);
    userApi
      .changeCoverImage(token, fd)
      .then((res) => {
        if (res.data.user) {
          console.log(res.data);
          setUserSession(token, res.data.user);
          setUserInfo({ ...getUser() });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log("F: ", err);
        setIsLoading(false);
      });
  };
  return (
    <div className="user-cover-image">
      {isLoading && <Loading />}
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
