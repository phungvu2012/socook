import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";
class HomePage {
  getCategory = () => {
    const COLLECTION_URL = "/categories/groups";
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopViewRecipe = () => {
    const COLLECTION_URL = "/api/recipe/top-recipe" + `?limit=8`;
    return axiosHost1.get(COLLECTION_URL);
  };
  getTopNewRecipe = () => {
    const COLLECTION_URL = "/rank/recipes/top10new";
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopSaveCollecion = () => {
    const COLLECTION_URL = "/rank/collections/toplike" + `?limit=8`;
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopNewCollection = () => {
    const COLLECTION_URL = "/rank/collections/top10new";
    return axiosHost2.get(COLLECTION_URL);
  };

  getTopViewRecipeInWeek = () => {
    const COLLECTION_URL = "/rank/recipes/week/top10view";
    return axiosHost2.get(COLLECTION_URL);
  }

  getTopUserDependTotalRecipe = () => {
    const COLLECTION_URL = "/api/user/topuser-recipe" + '?Limit=5';
    return axiosHost1.get(COLLECTION_URL);
  }
  getCategoryInGroup = (idCategoryGroup) => {
    const COLLECTION_URL = "/categories/groups" + `/${idCategoryGroup}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getAllRecipeFromCategoryGroup = (idCategoryGroup) => {
    const COLLECTION_URL = "/categories/recipes/groups" + `/${idCategoryGroup}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getAllRecipeFromCategory = (idCategory) => {
    const COLLECTION_URL = "/categories" + `/${idCategory}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getNotificationList = (token) => {
    const GET_NOTIFICATION_URL = "/api/interac/notification";
    return axiosHost1.get(GET_NOTIFICATION_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    });
  };
  setViewNotification = (token, idNoti) => {
    const SET_VIEW_NOTIFICATION_URL = "/api/interac/notification";
    return axiosHost1.put(SET_VIEW_NOTIFICATION_URL, {
      id: idNoti
    }, {
      headers: {
        token: `Bearer ${token}`,
      }
    });
  };

  setViewAllNotification = (token) => {
    const SET_VIEW_ALL_NOTIFICATION_URL = "/api/interac/allnotification";
    return axiosHost1.put(SET_VIEW_ALL_NOTIFICATION_URL, {
      data: "Hi",
    }, {
      headers: {
        token: `Bearer ${token}`,
      }
    });
  };
}

const homePage = new HomePage();

export default homePage;
