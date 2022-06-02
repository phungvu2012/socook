import axiosHost1 from "./axiosHost1";
import axiosHost2 from "./axiosHost2";
class RecipeApi {
  getRecipe = (token, id) => {
    const REPICE_URL = "/api/recipe/get-recipe" + `?id=${id}`;
    if(token) {
      return axiosHost1.get(REPICE_URL, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
    }
    return axiosHost1.get(REPICE_URL);
  }
  getMyRecipe = (token) => {
    const COLLECTION_URL = "/api/recipe/my-list-recipe";
    return axiosHost1.get(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  createRecipe = (token, formdata) => {
    const CREATE_RECIPE_URL = "/api/recipe/create-recipe";
    return axiosHost1.post(CREATE_RECIPE_URL, formdata,
    {
      headers: {
        'token': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    });
  };
  updateRecipe = (token, formdata) => {
    const UPDATE_RECIPE_URL = '/api/recipe/update-recipe';
    return axiosHost1.put(UPDATE_RECIPE_URL, formdata,
    {
      headers: {
        'token': `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    });
  };
  deleteRecipe = (token, idDElete) => {
    const COLLECTION_URL = "/api/recipe/delete-recipe" + `?id=${idDElete}`;
    return axiosHost1.delete(COLLECTION_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };
  getRecipeInCollection = (idCollection) => {
    const COLLECTION_URL = "/api/recipe/recipe-of-collection" + `/?id=${idCollection}`;
    return axiosHost1.get(COLLECTION_URL);
  };

  checkLike = (token, recipeId) => {
    const CHECK_LIKE_URL = "/api/recipe/check-like" + `?recipe_id=${recipeId}`;
    return axiosHost1.get(CHECK_LIKE_URL, {
      headers: {
        'token': `Bearer ${token}`,
      }
    })
  }

  likeRecipe = (token, recipeId) => {
    const LIKE_RECIPE_URL = "/api/interac/like-recipe";
    return axiosHost1.post(LIKE_RECIPE_URL, {
      recipe_id: recipeId
    }, {
      headers: {
        'token': `Bearer ${token}`,
      }
    })
  }

  dislikeRecipe = (token, recipeId) => {
    const DISLIKE_RECIPE_URL = "/api/interac/dislike-recipe";
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

  getCategory = () => {
    const GET_CATEGORY_URL = '/api/recipe/get-category';
    return axiosHost1.get(GET_CATEGORY_URL);
  }

  getRecipeComment = (idRecipe, token) => {
    const COLLECTION_URL = "/api/recipe/comment-of-recipe" + `/?id=${idRecipe}`;
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
    const LIKE_COMMENT_URL = "/api/interac/like-comment";
    return axiosHost1.post(LIKE_COMMENT_URL, {
      comment_id: commentId
    }, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  dislikeComment = (token, commentId) => {
    const DISLIKE_COMMENT_URL = "/api/interac/dislike-comment";
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
    const CREATE_COMMENT_URL = "/api/interac/create-comment";
    return axiosHost1.post(CREATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  updateComment = (token, commentObj) => {
    const UPDATE_COMMENT_URL = "/api/interac/update-comment";
    return axiosHost1.put(UPDATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  deleteComment = (token, commentId) => {
    const DELETE_COMMENT_URL = "/api/interac/delete-comment" + `?id=${commentId}`;
    return axiosHost1.delete(DELETE_COMMENT_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  createChildComment = (token, commentObj) => {
    const CREATE_COMMENT_URL = "/api/interac/create-child-comment";
    return axiosHost1.post(CREATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  updateChildComment = (token, commentObj) => {
    const UPDATE_COMMENT_URL = "/api/interac/update-child-comment";
    return axiosHost1.put(UPDATE_COMMENT_URL, commentObj, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  }

  deleteChildComment = (token, commentId) => {
    const DELETE_COMMENT_URL = "/api/interac/delete-child-comment" + `?id=${commentId}`;
    return axiosHost1.delete(DELETE_COMMENT_URL, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
  } 

  getMyPendingRecipe = (token) => {
    const GET_MY_PENDING_RECIPE_URL = "/api/recipe/wait-recipe";
    return axiosHost1.get(GET_MY_PENDING_RECIPE_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  getMyRejectRecipe = (token) => {
    const GET_MY_REJECT_RECIPE_URL = "/api/recipe/my-reject-recipe";
    return axiosHost1.get(GET_MY_REJECT_RECIPE_URL, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  };

  reportRecipe = (token, reportObj) => {
    const REPORT_RECIPE_URL = "/user/reports/recipes";
    return axiosHost2.post(REPORT_RECIPE_URL, reportObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  reportComment = (token, reportObj) => {
    const REPORT_COMMENT_URL = "/user/reports/comments";
    return axiosHost2.post(REPORT_COMMENT_URL, reportObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}

const recipeApi = new RecipeApi();

export default recipeApi;
