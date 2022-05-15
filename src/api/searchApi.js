import axiosHost2 from "./axiosHost2";
class SearchApi {
  getSearchSuggestions = (keyword) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_SUGGESTIONS_URL + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  };

  searchRecipes = (keyword) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_RECIPES_URL + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchCollections = (keyword) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_COLLECTIONS_URL + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchIngredients = (keyword) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_INGREDIENT_URL + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchRecipesByIngredient = (query) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_RECIPE_BY_INGREDIENT_URL + `?${query}`;
    return axiosHost2.get(COLLECTION_URL);
  }
}

const searchApi = new SearchApi();

export default searchApi;
