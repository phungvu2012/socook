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

  getRecipeComment = (idRecipe, token) => {
    const COLLECTION_URL = process.env.REACT_APP_GET_RECIPE_COMMENT_URL + `/?id=${idRecipe}`;
    if(token) {
      return axiosHost1.get(COLLECTION_URL, {
        headers: {
          token: `Bearer ${token}`,
        }
      });
    }
    return axiosHost1.get(COLLECTION_URL);
  };

  likeComment = (token, commentId) => {
    const LIKE_COMMENT_URL = process.env.REACT_APP_LIKE_COMMENT_URL;
    return axiosHost1.post(LIKE_COMMENT_URL, {
      comment_id: commentId
    }, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  dislikeComment = (token, commentId) => {
    const DISLIKE_COMMENT_URL = process.env.REACT_APP_DISLIKE_COMMENT_URL;
    return axiosHost1.delete(DISLIKE_COMMENT_URL, {
      data: {
        comment_id: commentId
      },
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  createComment = (token, commentObj) => {
    const CREATE_COMMENT_URL = process.env.REACT_APP_CREATE_COMMENT_URL;
    return axiosHost1.post(CREATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  updateComment = (token, commentObj) => {
    const UPDATE_COMMENT_URL = process.env.REACT_APP_UPDATE_COMMENT_URL;
    return axiosHost1.put(UPDATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  deleteComment = (token, commentId) => {
    const DELETE_COMMENT_URL = process.env.REACT_APP_DELETE_COMMENT_URL + `?id=${commentId}`;
    return axiosHost1.delete(DELETE_COMMENT_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  createChildComment = (token, commentObj) => {
    const CREATE_COMMENT_URL = process.env.REACT_APP_CREATE_CHILD_COMMENT_URL;
    return axiosHost1.post(CREATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  updateChildComment = (token, commentObj) => {
    const UPDATE_COMMENT_URL = process.env.REACT_APP_UPDATE_CHILD_COMMENT_URL;
    return axiosHost1.put(UPDATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  deleteChildComment = (token, commentId) => {
    const DELETE_COMMENT_URL = process.env.REACT_APP_DELETE_CHILD_COMMENT_URL + `?id=${commentId}`;
    return axiosHost1.delete(DELETE_COMMENT_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }
}

const recipeApi = new RecipeApi();

export default recipeApi;
