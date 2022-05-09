import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";

class UserPageApi {
  getUserInfo = (userName) => {
    const COLLECTION_URL = process.env.REACT_APP_USER_INFO_PAGE_URL + `?user_name=${userName}`;
    return axiosHost1.get(COLLECTION_URL);
  };

  getUserCollections = (userName) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_COLLECTIONS_OF_USER_URL + `/${userName}`;
    return axiosHost2.get(COLLECTION_URL);
  };

  getUserRecipes = (userName) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_RECIPES_OF_USER_URL + `?user_name=${userName}`;
    return axiosHost1.get(COLLECTION_URL);
  };

  followUser = (token, followUserId) => {
    const COLLECTION_URL = process.env.REACT_APP_FOLLOW_USER_URL;
    return axiosHost1.post(COLLECTION_URL, followUserId, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
}

const userPageApi = new UserPageApi();

export default userPageApi;