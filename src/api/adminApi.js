import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";

class AdminApi {
  checkToken = (token) => {
    const CHECK_TOKEN_URL = "/api/auth/checktoken";
    return axiosHost1.get(CHECK_TOKEN_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  getWaitRecipe = (token) => {
    const WAIT_RECIPE_URL = "/recipes/isallowedfalse";

    return axiosHost2.get(WAIT_RECIPE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  publishRecipe = (token, recipeId) => {
    const PUBLISH_RECIPE_URL = "/api/recipe/allowed-recipe";
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
    const DELETE_RECIPE_URL = "/api/recipe/delete-recipe?id=" + recipeId;
    return axiosHost1.delete(DELETE_RECIPE_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  rejectRecipe = (token, recipeId, reason) => {
    const REJECT_RECIPE_URL = "/api/recipe/reject-recipe";
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
    const GET_REPORT_RECIPE_URL = "/admin/reports/recipes";
    return axiosHost2.get(GET_REPORT_RECIPE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getReportUser = (token) => {
    const GET_REPORT_RECIPE_URL = "/admin/reports/users";
    return axiosHost2.get(GET_REPORT_RECIPE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getReportComment = (token) => {
    const GET_REPORT_COMMENT_URL = "/admin/reports/comments";
    return axiosHost2.get(GET_REPORT_COMMENT_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getUserActive = (token) => {
    const DELETE_RECIPE_URL = "/api/user/all-user";
    return axiosHost1.get(DELETE_RECIPE_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  searchUser = (token, keyword) => {
    const SEARCH_USER = '/admin/users/search?keyword=' + keyword;
    return axiosHost2.get(SEARCH_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  banUser = (token, userId) => {
    const BAN_USER = "/admin/users";
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

  responseReportComment = (token, reportId, response='') => {
    const RESPONSE_REPORT_COMMENT = '/admin/reports/comments/' + reportId;
    return axiosHost2.put(RESPONSE_REPORT_COMMENT, {
      status: 1,
      response: response,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  responseReportUser = (token, userId, responseContent='') => {
    const RESPONSE_REPORT_USER = '/admin/reports/users/' + userId;
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
