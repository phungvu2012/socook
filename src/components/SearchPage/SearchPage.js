import "./SearchPage.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchApi from "../../api/searchApi";

import CollectionsSearchResult from "./CollectionSearchResult/CollectionSearchResult";
import RecipesSearchResult from "./RecipeSearchResult/RecipeSearchResult";

function SearchPage() {
  const params = useParams();
  const [recipesSearchResult, setRecipesSearchResult] = useState([]);
  const [collectionsSearchResult, setCollectionsSearchResult] = useState([]);
  const [isInteractionCollection, setIsInteractionCollection] = useState(false);

  useEffect(() => {
    searchApi
      .searchRecipes(params.keyword)
      .then((res) => {
        setRecipesSearchResult([...res.data]);
      })
      .catch((err) => console.log(err));

    searchApi
      .searchCollections(params.keyword)
      .then((res) => {
        setCollectionsSearchResult([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [params.keyword, isInteractionCollection]);

  return (
    <>
      {!recipesSearchResult[0] && !collectionsSearchResult[0] ? (
        <div className="container">
          <div className="row">
            <h4 className="mt-4">
              Không tìm thấy kết quả phù hợp, vui lòng thử với từ khóa khác.
            </h4>
          </div>
        </div>
      ) : (
        <>
          <div className="recipes-search-result-container">
            <div className="container">
              {!recipesSearchResult[0] ? (
                <h4>Không tìm thấy công thức phù hợp với từ khóa</h4>
              ) : (
                <div className="row">
                  <h4>Công thức tìm được</h4>
                  {recipesSearchResult.map((recipe) => {
                    return (
                      <div className="col-2" key={recipe.id}>
                        <RecipesSearchResult recipe={recipe} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="collections-search-result-container">
            <div className="container">
              {!collectionsSearchResult[0] ? (
                <h4>Không tìm thấy bộ sưu tập phù hợp với từ khóa</h4>
              ) : (
                <div className="row">
                  <h4>Bộ sưu tập tìm được</h4>
                  {collectionsSearchResult.map((collection) => {
                    return (
                      <div className="col-2" key={collection.id}>
                        <CollectionsSearchResult
                          collection={collection}
                          setIsInteractionCollection={
                            setIsInteractionCollection
                          }
                          isInteractionCollection={isInteractionCollection}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SearchPage;
