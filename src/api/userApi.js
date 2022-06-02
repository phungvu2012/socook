import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";
class UserApi {
  userInfo = (token) => {
    const MYINFO_URL = "/api/user/myinfo";
    return axiosHost1.get(MYINFO_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  changeAvatar = (token, fd) => {
    const COLLECTION_URL = "/api/user/avatar";
    return axiosHost1.post(COLLECTION_URL, fd, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  changeUserInfo = (token, userInfo) => {
    const COLLECTION_URL = "/api/user/changemyinfo";
    return axiosHost1.put(COLLECTION_URL, userInfo, {
      headers: {
        token: `Bearer ${token}`
      },
    });
  };
  changePassword = (token, passwordObj) => {
    const COLLECTION_URL = "/api/auth/changepassword";
    return axiosHost1.put(COLLECTION_URL, passwordObj, {
      headers: {
        token: `Bearer ${token}`
      },
    });
  };
  changeCoverImage = (token, fd) => {
    const COLLECTION_URL = "/api/user/coverimage";
    return axiosHost1.post(COLLECTION_URL, fd, {
      headers: {
        token: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  getMyComment = (token) => {
    const GET_MY_COMMENT_URL = "/api/interac/history-comment";
    return axiosHost1.get(GET_MY_COMMENT_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  reportUser = (token, reportObj) => {
    const REPORT_USER_URL = "/user/reports/users";
    return axiosHost2.post(REPORT_USER_URL, reportObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}

const userApi = new UserApi();

export default userApi;
