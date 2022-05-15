import "./AdvanceSearchPage.scss";
import { useRef, useState } from "react";
import searchApi from "../../api/searchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import RecipesSearchResult from "../SearchPage/RecipeSearchResult/RecipeSearchResult";

function AdvanceSearchPage() {
  const [keywords, setKeyWords] = useState([]);
  const advanceSearchInput = useRef();
  const [ingredientListRecommand, setIngredientListRecommand] = useState([]);
  const [recipeResult, setRecipeResult] = useState([]);
  const [isDisplaySearchIngredientResult, setIsDisplaySearchIngredientResult] =
    useState(false);

  const handleAdvanceSearchInput = (e) => {
    if (e.target.value) {
      searchApi
        .searchIngredients(e.target.value)
        .then((res) => {
          console.log(res);
          setIngredientListRecommand([...res.data]);
        })
        .catch((err) => console.log(err));
      setIsDisplaySearchIngredientResult(true);
    } else {
      setIsDisplaySearchIngredientResult(false);
    }
  };

  const handleClickIngredient = (e) => {
    if (!keywords.find((keyword) => keyword.id === e.target.dataset.id)) {
      setKeyWords([
        ...keywords,
        { id: e.target.dataset.id, name: e.target.dataset.name },
      ]);
    }
    advanceSearchInput.current.value = "";
    setIngredientListRecommand([]);
  };

  const mapKeywordsListToQuery = (keywords) => {
    return keywords
      .map((keyword) => {
        return `ingredientIds=${keyword.id}`;
      })
      .join("&");
  };

  const handleRemoveKeyword = (e) => {
    const tempKeywords = keywords.filter(
      (keyword) => keyword.id !== e.target.dataset.id
    );
    setKeyWords([...tempKeywords]);
  };

  const handleAdvanceSearch = (e) => {
    e.preventDefault();
    if (mapKeywordsListToQuery(keywords)) {
      searchApi
        .searchRecipesByIngredient(mapKeywordsListToQuery(keywords))
        .then((res) => {
          setRecipeResult([...res.data]);
          console.log("REcipes: ", res);
        })
        .catch((err) => console.log(err));
    } else {
      setRecipeResult([])
    }
  };

  return (
    <div className="advance-search-container">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="advance-search-input-wrapper">
              <h5>Tìm kiếm theo nguyên liệu</h5>
              <div className="advance-search-input-area">
                <input
                  type="text"
                  ref={advanceSearchInput}
                  onChange={handleAdvanceSearchInput}
                  placeholder="Nhập tên nguyên liệu..."
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="advance-search-glass-icon"
                />
                {isDisplaySearchIngredientResult && (
                  <ul className="advance-search-suggestion-result">
                    {ingredientListRecommand.slice(0, 6).map((suggestion) => {
                      return (
                        <li
                          key={suggestion.id}
                          className="advance-search-suggestion-result-item"
                          onClick={handleClickIngredient}
                          data-id={suggestion.id}
                          data-name={suggestion.name}
                        >
                          {suggestion.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="advance-search-keyword-area">
                <p>Nguyên liệu đã chọn</p>
                {!keywords[0] ? (
                  <span>Bạn chưa chọn nguyên liệu nào</span>
                ) : (
                  <ul className="advance-search-keyword-list">
                    {keywords?.map((keyword) => {
                      return (
                        <li
                          className="advance-search-keyword-item"
                          key={keyword.id}
                        >
                          {keyword.name}
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="ms-1 advance-search-keyword-item-delete-icon"
                            data-id={keyword.id}
                            onClick={handleRemoveKeyword}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <button
                className={`advance-search-button ${
                  keywords[0] ? "" : "advance-search-button--disable"
                }`}
                onClick={handleAdvanceSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className="col-8">
            <div className="advance-search-recipe-result">
              <div className="container">
                <div className="row">
                  <h5>Kết quả tìm kiếm</h5>
                  {!recipeResult[0] ? (
                    <p>Không tìm thấy món ăn theo các nguyên liệu đã chọn</p>
                  ) : (
                    recipeResult.map((recipe) => {
                      return (
                        <div className="col-3" key={recipe.id}>
                          <RecipesSearchResult recipe={recipe} />
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvanceSearchPage;
