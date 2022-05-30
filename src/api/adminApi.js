import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";

class AdminApi {
  checkToken = (token) => {
    const CHECK_TOKEN_URL = "/api/auth/checktoken";
    return axiosHost1.get(CHECK_TOKEN_URL,{
        headers: {
            token: `Bearer ${token}`,
        },
    });
  };

  getWaitRecipe = (token) => {
    const WAIT_RECIPE_URL =  "/recipes/isallowedfalse";

    return axiosHost2.get(WAIT_RECIPE_URL,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  publishRecipe = (token, recipeId) => {
    const PUBLISH_RECIPE_URL = '/api/recipe/allowed-recipe';
    return axiosHost1.put(PUBLISH_RECIPE_URL, {
      recipe_id: recipeId
    },{
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
  
  deleteRecipe = (token, recipeId) => {
    const DELETE_RECIPE_URL = '/api/recipe/delete-recipe?id=' + recipeId;
    return axiosHost1.delete(DELETE_RECIPE_URL,{
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
}

const adminApi = new AdminApi();

export default adminApi;