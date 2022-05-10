import "./SearchPage.scss";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import searchApi from "../../api/searchApi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import CollectionsSearchResult from "./CollectionSearchResult/CollectionSearchResult";
// import {faHeart} from "@fortawesome/free-solid-svg-icons";

function SearchPage() {
  const params = useParams();
  // const token = getToken()
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
      {console.log("parent rerender")}
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
                  {recipesSearchResult.map((recipe, index) => {
                    return (
                      <div className="col-2" key={recipe.id}>
                        <div className="collection-recipe-container">
                          <Link to="/" className="collection-recipe-wrapper">
                            <div className="collection-recipe-image-wrapper recipe-search-result-wrapper">
                              <div className="image-overlay"></div>
                              <img
                                src={recipe.main_image_url}
                                alt={recipe.title}
                                className="collection-recipe-image"
                              />
                            </div>
                            <div className="collection-recipe-info">
                              <h5 className="collection-recipte-title">
                                {recipe.title}
                              </h5>
                              <div className="collection-recipe-detail">
                                <div className="collection-recipe-detail-number">
                                  <span>
                                    <FontAwesomeIcon icon={faClock} />
                                    {` ${recipe.cooking_time}`} phút
                                  </span>
                                  <span>
                                    <FontAwesomeIcon icon={faEye} />
                                    {` ${recipe.total_views}`}
                                  </span>
                                </div>
                                <p>
                                  Khẩu phần ăn: {recipe.amount_of_people} người
                                </p>
                              </div>
                            </div>
                          </Link>
                          <a href="/" className="collection-recipe-owner">
                            <span>Người tạo:</span> {recipe.user_name}
                          </a>
                        </div>
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
                      <CollectionsSearchResult
                        key={collection.id}
                        collection={collection}
                        setIsInteractionCollection={setIsInteractionCollection}
                        isInteractionCollection={isInteractionCollection}
                      />
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
