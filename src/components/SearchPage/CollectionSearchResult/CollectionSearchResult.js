import { useEffect, useState } from "react";
import { getToken } from "../../../features/sessionStorage";
import { getUser } from "../../../features/sessionStorage";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import noImgCollection from "./../../../assets/image/noImageCollection/no-image-collection.png";
import collection from "../../../api/collection";

function CollectionsSearchResult(props) {
  const token = getToken();
  const userInfo = getUser();
  const navigate = useNavigate()
  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };
  const [saveCollection, setSaveCollection] = useState([]);

  const handleSaveCollection = (e, collectionId) => {
    e.preventDefault();
    if (token) {
      if (e.target.dataset.isSave === "1") {
        if (token) {
          collection
            .unsaveCollection(token, collectionId)
            .then((res) => {
              console.log(res);
              props?.setIsInteractionCollection((prevState) => !prevState);
            })
            .catch((err) => console.log(err));
        }
      } else {
        if (token) {
          collection
            .saveCollection(token, collectionId)
            .then((res) => {
              console.log(res);
              props?.setIsInteractionCollection((prevState) => !prevState);
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      navigate('/login')
    }
  };

  useEffect(() => {
    async function getCollectionSave() {
      if (token) {
        await collection
          .getCollectionSave(token)
          .then((res) => setSaveCollection(res.data));
      }
    }
    getCollectionSave();
  }, [props.isInteractionCollection]);

  return (
    <div className="collection-wrapper">
      <Link
        to={
          !userInfo || userInfo?.user_name !== props.collection.userName
            ? `/collection/${props.collection.id}`
            : `/user/collection/${props.collection.id}`
        }
        state={{
          collectionName: capitalize(props.collection.name),
        }}
      >
        <div className="collection-image-wrapper">
          <div className="image-overlay"></div>
          <img
            src={props.collection.imageUrl || noImgCollection}
            alt={props.collection.name}
            className="collection-image"
          />
          <span className="collection-save">
            <span className="collection-total-save">
              {props.collection.totalLikes}
            </span>
            <span
              className={`collection-save-icon-wrapper ${
                !saveCollection[0] ||
                !saveCollection.filter(
                  (col) => col.id === props.collection.id
                )[0]
                  ? ""
                  : "is-save-collection"
              }`}
            >
              <div
                className="collection-save-overlay"
                onClick={(e) => handleSaveCollection(e, props.collection.id)}
                data-is-save={
                  !saveCollection[0] ||
                  !saveCollection.filter(
                    (col) => col.id === props.collection.id
                  )[0]
                    ? 0
                    : 1
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
          {capitalize(props.collection.name)}
        </div>
      </Link>
      <div className="collection-search-result-detail">
        <span>{props.collection.recipeIds?.length} công thức</span>
        <Link to={`/user-page/${props.collection.userName}`}>
          {props.collection.userName}
        </Link>
      </div>
    </div>
  );
}

export default CollectionsSearchResult;
