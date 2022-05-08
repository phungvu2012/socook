import "./SearchPage.scss";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import searchApi from "../../api/searchApi";
import noImgCollection from "./../../assets/image/noImageCollection/no-image-collection.png";
import collection from "../../api/collection";
import { getToken } from "../../features/sessionStorage";
import { getUser } from "../../features/sessionStorage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

function SearchPage() {
  const params = useParams();
  const [recipesSearchResult, setRecipesSearchResult] = useState([]);
  const [collectionsSearchResult, setCollectionsSearchResult] = useState([]);
  const [saveCollection, setSaveCollection] = useState([]);
  const [isInteractionCollection, setIsInteractionCollection] = useState(false);
  const userInfo = getUser();

  const token = getToken();
  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };

  const handleSaveCollection = (e, collectionId) => {
    e.preventDefault();
    console.log(e.target.dataset.isSave);
    if (e.target.dataset.isSave === "1") {
      collection
        .unsaveCollection(token, collectionId)
        .then((res) => {
          console.log(res);
          setIsInteractionCollection((prevState) => !prevState);
        })
        .catch((err) => console.log(err));
    } else {
      collection
        .saveCollection(token, collectionId)
        .then((res) => {
          console.log(res);
          setIsInteractionCollection((prevState) => !prevState);
        })
        .catch((err) => console.log(err));
    }
  };

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

  useEffect(() => {
    async function getCollectionSave() {
      await collection
        .getCollectionSave(token)
        .then((res) => setSaveCollection(res.data));
    }
    getCollectionSave();
  }, [isInteractionCollection]);
  return (
    <>
      {console.log("recipes: ", recipesSearchResult)}
      {console.log("collections: ", collectionsSearchResult)}
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
                      <Link
                        to={
                          userInfo.user_name === collection.userName
                            ? `/user/collection/${collection.id}`
                            : `/collection/${collection.id}`
                        }
                        state={{
                          collectionName: capitalize(collection.name)
                        }}
                        className="col-2"
                        key={collection.id}
                      >
                        <div className="collection-wrapper">
                          <div className="collection-image-wrapper">
                            <div className="image-overlay"></div>
                            <img
                              src={collection.imageUrl || noImgCollection}
                              alt={collection.name}
                              className="collection-image"
                            />
                            <span className="collection-save">
                              <span className="collection-total-save">
                                {collection.totalLikes}
                              </span>
                              <span
                                className={`collection-save-icon-wrapper ${
                                  saveCollection.filter(
                                    (col) => col.id === collection.id
                                  )[0]
                                    ? "is-save-collection"
                                    : ""
                                }`}
                              >
                                <div
                                  className="collection-save-overlay"
                                  onClick={(e) =>
                                    handleSaveCollection(e, collection.id)
                                  }
                                  data-is-save={
                                    saveCollection.filter(
                                      (col) => col.id === collection.id
                                    )[0]
                                      ? 1
                                      : 0
                                  }
                                ></div>
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="collection-save-icon"
                                />
                              </span>
                            </span>
                          </div>
                          <div className="collection-name">
                            {capitalize(collection.name)}
                          </div>
                          <div className="collection-search-result-detail">
                            <span>{collection.recipeIds.length} công thức</span>
                            <span>{collection.userName}</span>
                          </div>
                        </div>
                      </Link>
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
