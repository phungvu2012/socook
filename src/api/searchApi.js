import axiosHost2 from "./axiosHost2";
class SearchApi {
  getSearchSuggestions = (keyword) => {
    const COLLECTION_URL = process.env.REACT_APP_SEARCH_SUGGESTIONS_URL + `?keyword=${keyword}`;
    return axiosHost2.get(COLLECTION_URL);
  };
}

const searchApi = new SearchApi();

export default searchApi;
