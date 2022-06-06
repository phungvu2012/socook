import "./RecipeSaveCollection.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../../../features/sessionStorage";
import collection from "../../../../api/collection";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecipeSaveCollection({
  collectionSaved,
  recipeId,
  isGetCollectionSaveListAgain,
  setIsGetCollectionListAgain,
}) {
  const token = getToken();
  const [userCollectionList, setUserCollectionList] = useState([]);
  const [isDisplayCollectionList, setIsDisplayCollectionList] = useState(false);

  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };

  const unSaveRecipeToCollection = (e, collectionId) => {
    e.preventDefault();
    console.log("unsave: ", collectionId);
    collection
      .deleteRecipeInCollection(token, collectionId, recipeId)
      .then((res) => {
        console.log("unsave res: ", res);
        setIsGetCollectionListAgain(!isGetCollectionSaveListAgain);
      })
      .catch((err) => {
        console.log("unsave err: ", err);
      });
  };

  const saveRecipeToCollection = (e, collectionId) => {
    e.preventDefault();
    console.log("add: ", collectionId);
    collection
      .addRecipeToCollection(token, collectionId, recipeId)
      .then((res) => {
        console.log("add res: ", res);
        setIsGetCollectionListAgain(!isGetCollectionSaveListAgain);
      })
      .catch((err) => {
        console.log("add err: ", err);
      });
  };

  useEffect(() => {
    if (token) {
      collection
        .getCollection(token)
        .then((res) => {
          setUserCollectionList([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="recipe-save-collection-container">
      <button
        className="recipe-save-collection-btn"
        onClick={() => setIsDisplayCollectionList((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </button>
      {isDisplayCollectionList && (
        <ul
          className={`recipe-save-collection-my-collection-list ${
            userCollectionList?.length > 6
              ? "recipe-save-collection-my-collection-list--overflow-y"
              : ""
          }`}
        >
          {!token ? (
            <li className="recipe-save-collection-my-collection-text-message">
              Bạn hiện chưa đăng nhập, hãy <Link to="/login">đăng nhập</Link> để
              thêm công thức này vào bộ sưu tập{" "}
            </li>
          ) : userCollectionList?.length < 1 ? (
            <li className="recipe-save-collection-my-collection-text-message">
              Bạn chưa có bộ sưu tập nào, hãy tạo bộ sưu tập tại đây{" "}
              <Link to="/user/collection">đây</Link>
            </li>
          ) : (
            userCollectionList?.map((collection) => {
              return (
                <li
                  key={collection.id}
                  className="recipe-save-collection-my-collection-item"
                >
                  <Link
                    to={`/user/collection/${collection.id}`}
                    state={{
                      collectionName: capitalize(collection.name),
                    }}
                  >
                    <span className="recipe-save-collection-my-collection-item-name">
                      {collection.name}
                    </span>
                    <span className="recipe-save-collection-my-collection-item-icon">
                      {collectionSaved?.find(
                        (colSaved) => colSaved.id === collection.id
                      ) ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="recipe-save-collection-my-collection-item-icon--check"
                          onClick={(e) =>
                            unSaveRecipeToCollection(e, collection.id)
                          }
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCirclePlus}
                          className="recipe-save-collection-my-collection-item-icon--add"
                          onClick={(e) =>
                            saveRecipeToCollection(e, collection.id)
                          }
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}

export default RecipeSaveCollection;
