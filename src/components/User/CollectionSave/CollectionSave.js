import "./CollectionSave.scss";
import { getToken } from "./../../../features/sessionStorage";
import { useState, useEffect } from "react";
import collection from "../../../api/collection";
import noImgCollection from "./../../../assets/image/noImageCollection/no-image-collection.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function CollectionSave() {
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);
  const [idCollectionDelete, setIdCollectionDelete] = useState();
  const [saveCollection, setSaveCollection] = useState([]);
  const [isInteractionCollection, setIsInteractionCollection] = useState(false);
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
    <div className="collection-container">
      <div className="container">
        <div className="row">
          {saveCollection.map((collection, index) => {
            return (
              <Link
                to={`/user/collection/${collection.id}`}
                className="col-3"
                key={collection.id}
              >
                {console.log(saveCollection)}
                <div className="collection-wrapper">
                  <div className="collection-image-wrapper">
                    <div className="image-overlay"></div>
                    <img
                      src={noImgCollection}
                      alt={collection.name}
                      className="collection-image"
                    />
                    <span className="collection-save">
                    <span className="collection-total-save">{collection.totalLikes}</span>
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
                  <div className="collection-save-detail">
                    <span>{collection.recipeIds.length} công thức</span>
                    <span>{collection.username || "username"}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CollectionSave;
