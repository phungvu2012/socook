import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";

class UserPageApi {
  getUserInfo = (token, userName) => {
    const COLLECTION_URL = "/api/user/userinfo" + `?user_name=${userName}`;
    if(token) {
      return axiosHost1.get(COLLECTION_URL,{
        headers: {
          token: `Bearer ${token}`,
        },
      });
    }
    return axiosHost1.get(COLLECTION_URL);
  };

  getUserCollections = (userName) => {
    const COLLECTION_URL = "/collections/users" + `/${userName}`;
    return axiosHost2.get(COLLECTION_URL);
  };

  getUserRecipes = (userName) => {
    const COLLECTION_URL = "/api/recipe/user-list-recipe" + `?user_name=${userName}`;
    return axiosHost1.get(COLLECTION_URL);
  };

  followUser = (token, followUserId) => {
    const COLLECTION_URL = "/api/interac/follow";
    return axiosHost1.post(COLLECTION_URL, followUserId, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }

  unfollowUser = (token, followUserId) => {
    const COLLECTION_URL = "/api/interac/unfollow";
    return axiosHost1.delete(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`
      },
      data : followUserId
    });
  }
}

const userPageApi = new UserPageApi();

export default userPageApi;