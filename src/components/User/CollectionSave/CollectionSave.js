import "./CollectionSave.scss";
import { getToken } from "./../../../features/sessionStorage";
import { getUser } from "./../../../features/sessionStorage";
import { useState, useEffect } from "react";
import collection from "../../../api/collection";
import noImgCollection from "./../../../assets/image/noImageCollection/no-image-collection.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CollectionSave() {
  const [saveCollection, setSaveCollection] = useState([]);
  const [isInteractionCollection, setIsInteractionCollection] = useState(false);
  const token = getToken();
  const userInfo = getUser();
  const [userHeader, setUserHeader] = useState('Bộ sưu tập đã lưu');
  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };

  const handleSaveCollection = (e, collectionId) => {
    e.preventDefault();
    collection
      .unsaveCollection(token, collectionId)
      .then((res) => {
        console.log(res);
        setIsInteractionCollection((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };

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
      <h3 className="user-header">{userHeader}</h3>
      <div className="collection-container">
        <div className="container">
          <div className="row">
            {saveCollection.map((collection) => {
              return (
                <div className="col-3" key={collection.id}>
                  <div className="collection-wrapper">
                    <Link
                      to={
                        userInfo.user_name === collection.userName
                          ? `/user/collection/${collection.id}`
                          : `/collection/${collection.id}`
                      }
                      state={{
                        collectionName: capitalize(collection.name),
                      }}
                    >
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
                          <span className="collection-save-icon-wrapper is-save-collection">
                            <div
                              className="collection-save-overlay"
                              onClick={(e) =>
                                handleSaveCollection(e, collection.id)
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
                    </Link>
                    <div className="collection-save-detail">
                      <span>{collection.recipeIds.length} công thức</span>
                      <Link to={`/user-page/${collection.userName}`}>
                        {collection.userName}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionSave;
