import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";

class AdminApi {
  checkToken = (token) => {
    const CHECK_TOKEN_URL = process.env.REACT_APP_ADMIN_CHECK_TOKEN_URL;
    return axiosHost1.get(CHECK_TOKEN_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  getWaitRecipe = (token) => {
    const WAIT_RECIPE_URL = process.env.REACT_APP_ADMIN_WAIT_RECIPE_URL;

    return axiosHost2.get(WAIT_RECIPE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  publishRecipe = (token, recipeId) => {
    const PUBLISH_RECIPE_URL = process.env.REACT_APP_ADMIN_PUBLISH_RECIPE_URL;
    return axiosHost1.put(
      PUBLISH_RECIPE_URL,
      {
        recipe_id: recipeId,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  };

  deleteRecipe = (token, recipeId) => {
    const DELETE_RECIPE_URL = process.env.REACT_APP_ADMIN_DELETE_RECIPE_URL + '?id=' + recipeId;
    return axiosHost1.delete(DELETE_RECIPE_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  rejectRecipe = (token, recipeId, reason) => {
    const REJECT_RECIPE_URL = process.env.REACT_APP_ADMIN_REJECT_RECIPE_URL;
    return axiosHost1.put(
      REJECT_RECIPE_URL,
      {
        recipe_id: recipeId,
        reason: reason,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  };

  getReportRecipe = (token) => {
    const GET_REPORT_RECIPE_URL = process.env.REACT_APP_ADMIN_GET_REPORT_RECIPE_URL;
    return axiosHost2.get(GET_REPORT_RECIPE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getReportUser = (token) => {
    const GET_REPORT_USER_URL = process.env.REACT_APP_ADMIN_GET_REPORT_USER_URL;
    return axiosHost2.get(GET_REPORT_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getReportComment = (token) => {
    const GET_REPORT_COMMENT_URL = process.env.REACT_APP_ADMIN_GET_REPORT_COMMENT_URL;
    return axiosHost2.get(GET_REPORT_COMMENT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getUserActive = (token) => {
    const GET_ALL_USER_ACTIVE = process.env.REACT_APP_ADMIN_GET_ALL_USER_ACTIVE;
    return axiosHost1.get(GET_ALL_USER_ACTIVE, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  searchUser = (token, keyword) => {
    const SEARCH_USER = process.env.REACT_APP_ADMIN_SEARCH_USER + '?keyword=' + keyword;
    return axiosHost2.get(SEARCH_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  banUser = (token, userId) => {
    const BAN_USER = process.env.REACT_APP_ADMIN_BAN_USER;
    return axiosHost2.put(BAN_USER, {
        id: userId,
        status: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  
  unlockUser = (token, userId) => {
    const BAN_USER = process.env.REACT_APP_ADMIN_BAN_USER;
    return axiosHost2.put(BAN_USER, {
        id: userId,
        status: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  responseReportComment = (token, reportId, response='') => {
    const RESPONSE_REPORT_COMMENT = process.env.REACT_APP_ADMIN_RESPONSE_REPORT_COMMENT + '/' + reportId;
    return axiosHost2.put(RESPONSE_REPORT_COMMENT, {
      status: 1,
      response: response,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  responseReportUser = (token, reportId, responseContent='') => {
    const RESPONSE_REPORT_USER = process.env.REACT_APP_ADMIN_RESPONSE_REPORT_USER + '/' + reportId;
    return axiosHost2.put(RESPONSE_REPORT_USER, {
      status: 1,
      response: responseContent,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}

const adminApi = new AdminApi();

export default adminApi;
