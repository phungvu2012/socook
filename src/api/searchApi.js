import axiosHost2 from "./axiosHost2";
class SearchApi {
  getSearchSuggestions = (keyword) => {
    const COLLECTION_URL = "/search/suggestion" + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  };

  searchRecipes = (keyword) => {
    const COLLECTION_URL = "/search/recipes" + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchCollections = (keyword) => {
    const COLLECTION_URL = "/search/collections" + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchIngredients = (keyword) => {
    const COLLECTION_URL = "/search/ingredients" + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  }

  searchRecipesByIngredient = (query) => {
    const COLLECTION_URL = "/search/recipes/ingredients" + `?${query}`;
    return axiosHost2.get(COLLECTION_URL);
  }
}

const searchApi = new SearchApi();

export default searchApi;
