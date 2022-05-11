import axiosHost1 from "./axiosHost1";
class UserApi {
  changeAvatar = (token, fd) => {
    const COLLECTION_URL = process.env.REACT_APP_USER_CHANGE_AVATAR_URL;
    return axiosHost1.post(COLLECTION_URL, fd, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  changeUserInfo = (token, userInfo) => {
    const COLLECTION_URL = process.env.REACT_APP_USER_CHANGE_USER_INFO_URL;
    return axiosHost1.put(COLLECTION_URL, userInfo, {
      headers: {
        token: `Bearer ${token}`
      },
    });
  };
  changePassword = (token, passwordObj) => {
    const COLLECTION_URL = process.env.REACT_APP_USER_CHANGE_PASSWORD_URL;
    return axiosHost1.put(COLLECTION_URL, passwordObj, {
      headers: {
        token: `Bearer ${token}`
      },
    });
  };
  changeCoverImage = (token, fd) => {
    const COLLECTION_URL = process.env.REACT_APP_CHANGE_COVER_IMAGE_URL;
    return axiosHost1.post(COLLECTION_URL, fd, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

const userApi = new UserApi();

export default userApi;
