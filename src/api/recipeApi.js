import axiosHost1 from "./axiosHost1";
class RecipeApi {
  getRecipe = (token, id) => {
    const REPICE_URL = process.env.REACT_APP_RECIPE_URL + `?id=${id}`;
    return axiosHost1.get(REPICE_URL,{} ,{
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
  getMyRecipe = (token) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_MY_RECIPE_URL;
    return axiosHost1.get(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  createRecipe = (token, formdata) => {
    const CREATE_RECIPE_URL = process.env.REACT_APP_CREATE_RECIPE_URL;
    return axiosHost1.post(CREATE_RECIPE_URL, formdata,
    {
      headers: {
        'token': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
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
  getRecipeInCollection = (idCollection) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_RECIPE_IN_COLLECTIOn_URL + `/?id=${idCollection}`;
    return axiosHost1.get(COLLECTION_URL);
  };

  checkLike = (token, recipeId) => {
    const CHECK_LIKE_URL = process.env.REACT_APP_CHECK_LIKE_URL + `?recipe_id=${recipeId}`;
    return axiosHost1.get(CHECK_LIKE_URL, {
      headers: {
        'token': `Bearer ${token}`,
      }
    })
  }

  likeRecipe = (token, recipeId) => {
    const LIKE_RECIPE_URL = process.env.REACT_APP_LIKE_RECIPE_URL;
    return axiosHost1.post(LIKE_RECIPE_URL, {
      recipe_id: recipeId
    }, {
      headers: {
        'token': `Bearer ${token}`,
      }
    })
  }

  dislikeRecipe = (token, recipeId) => {
    const DISLIKE_RECIPE_URL = process.env.REACT_APP_DISLIKE_RECIPE_URL;
    console.log('DISLIKE_RECIPE_URL ', token, ' ', recipeId);
    return axiosHost1.delete(DISLIKE_RECIPE_URL, {
      data: {
        recipe_id: recipeId
      },
      headers: {
        'token': `Bearer ${token}`,
      }
    })
  }
}

const recipeApi = new RecipeApi();

export default recipeApi;
