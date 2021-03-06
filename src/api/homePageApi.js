import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";
class HomePage {
  getCategory = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_CATEGORY_URL;
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopViewRecipe = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_RECIPE_VIEW_URL + `?limit=8`;
    return axiosHost1.get(COLLECTION_URL);
  };
  getTopNewRecipe = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_NEW_RECIPE_URL;
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopSaveCollecion = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_COLLECTION_SAVE_URL + `?limit=8`;
    return axiosHost2.get(COLLECTION_URL);
  };
  getTopNewCollection = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_NEW_COLLECTION_URL;
    return axiosHost2.get(COLLECTION_URL);
  };

  getTopViewRecipeInWeek = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_10_VIEW_RECIPE_IN_WEEK_URL;
    return axiosHost2.get(COLLECTION_URL);
  }

  getTopUserDependTotalRecipe = () => {
    const COLLECTION_URL = process.env.REACT_APP_GET_TOP_USER_DEPEND_TOTAL_RECIPE_URL + '?Limit=5';
    return axiosHost1.get(COLLECTION_URL);
  }
  getCategoryInGroup = (idCategoryGroup) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_CATEGORY_FROM_GROUP_URL + `/${idCategoryGroup}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getAllRecipeFromCategoryGroup = (idCategoryGroup) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_ALL_RECIPE_FROM_CATEGORY_GROUP_URL + `/${idCategoryGroup}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getAllRecipeFromCategory = (idCategory) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_ALL_RECIPE_FROM_CATEGORY_URL + `/${idCategory}`;
    return axiosHost2.get(COLLECTION_URL);
  }
  getNotificationList = (token) => {
    const GET_NOTIFICATION_URL = process.env.REACT_APP_GET_NOTIFICATION_URL;
    return axiosHost1.get(GET_NOTIFICATION_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    });
  };
  setViewNotification = (token, idNoti) => {
    const SET_VIEW_NOTIFICATION_URL = process.env.REACT_APP_CHECK_VIEW_NOTIFICATION_URL;
    return axiosHost1.put(SET_VIEW_NOTIFICATION_URL, {
      id: idNoti
    }, {
      headers: {
        token: `Bearer ${token}`,
      }
    });
  };

  setViewAllNotification = (token) => {
    const SET_VIEW_ALL_NOTIFICATION_URL = process.env.REACT_APP_CHECK_VIEW_ALL_NOTIFICATION_URL;
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
