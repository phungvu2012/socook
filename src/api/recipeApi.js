import axiosHost1 from "./axiosHost1";
class RecipeApi {
  getMyRecipe = (token) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_MY_RECIPE_URL;
    return axiosHost1.get(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  deleteRecipe = (token, idDElete) => {
    const COLLECTION_URL = process.env.REACT_APP_DELETE_RECIPE_URL + `?id=${idDElete}`;
    return axiosHost1.delete(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  getRecipeInCollection = (token, idCollection) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_RECIPE_IN_COLLECTIOn_URL + `/?id=${idCollection}`;
    return axiosHost1.get(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
}

const recipeApi = new RecipeApi();

export default recipeApi;
