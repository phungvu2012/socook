import "./Collection.scss";
import { getToken } from "./../../../features/sessionStorage";
import { useState, useEffect } from "react";
import collection from "../../../api/collection";
import noImgCollection from "./../../../assets/image/noImageCollection/no-image-collection.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFilePen,
  faCirclePlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Collection() {
  const [userCollection, setUserCollection] = useState([]);
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);
  const [idCollectionDelete, setIdCollectionDelete] = useState();
  const [idCollectionUpdate, setIdCollectionUpdate] = useState();
  const [collectionNameUpdate, setCollectionNameUpdate] = useState("");
  const [collectionPrivacy, setCollectionPrivacy] = useState(1);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [saveCollection, setSaveCollection] = useState([]);
  const [isInteractionCollection, setIsInteractionCollection] = useState(false)
  const token = getToken();
  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };

  const updateCollection = (e, collectionId, collectionIndex) => {
    e.preventDefault();
    setIdCollectionUpdate(collectionId);
    setCollectionNameUpdate(userCollection[collectionIndex].name);
    setCollectionPrivacy(userCollection[collectionIndex].isPublic);
  };

  const handleDeleteCollection = (e, collectionId) => {
    e.preventDefault();
    setIsDeleteCollection(true);
    setIdCollectionDelete(collectionId);
  };

  const confirmDeleteCollection = () => {
    collection
      .deleteCollection(token, idCollectionDelete)
      .then((res) => {
        console.log(res);
        setIsDeleteCollection(false);
        setIdCollectionDelete("");
      })
      .catch((err) => console.log(err));
  };

  const handleCancelUpdateCollection = (e) => {
    e.preventDefault();
    setIdCollectionUpdate("");
    setCollectionNameUpdate("");
    setCollectionPrivacy(1);
    setIsCreateCollection(false);
  };

  const handleUpdateCollection = (e) => {
    e.preventDefault();
    async function updateCollection() {
      if (isCreateCollection) {
        await collection
          .updateCollection(token, {
            name: collectionNameUpdate,
            isPublic: collectionPrivacy,
          })
          .then((res) => {
            setIdCollectionUpdate("");
            setCollectionNameUpdate("");
            setCollectionPrivacy(1);
            setIsCreateCollection(false);
          });
      } else {
        await collection
          .createCollection(token, {
            name: collectionNameUpdate,
            isPublic: collectionPrivacy,
          })
          .then((res) => {
            setIdCollectionUpdate("");
            setCollectionNameUpdate("");
            setCollectionPrivacy(1);
            setIsCreateCollection(false);
          });
      }
    }
    updateCollection();
  };

  const handleSaveCollection = (e, collectionId) => {
    e.preventDefault();
    console.log(e.target.dataset.isSave);
    if (e.target.dataset.isSave === "1") {
      collection
        .unsaveCollection(token, collectionId)
        .then(res => {
          console.log(res)
          setIsInteractionCollection(prevState => !prevState)
        })
        .catch(err => console.log(err));
    } else {
      collection
        .saveCollection(token, collectionId)
        .then(res => {
          console.log(res)
          setIsInteractionCollection(prevState => !prevState)
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    async function getCollection() {
      const res = await collection.getCollection(token);
      setUserCollection([...res.data]);
    }
    getCollection();
  }, [idCollectionUpdate, isCreateCollection, idCollectionDelete, isInteractionCollection]);

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
      <button
        className="btn btn-info create-collection-button"
        onClick={() => setIsCreateCollection(true)}
      >
        <FontAwesomeIcon icon={faCirclePlus} />
        <span>Tạo bộ sưu tập</span>
      </button>
      <div className="container">
        <div className="row">
          {userCollection.map((collection, index) => {
            return (
              <Link
                to={`${collection.id}`}
                className="col-3"
                key={collection.id}
                state={{
                  collectionName: capitalize(collection.name)
                }}
              >
                {console.log(userCollection)}
                {console.log(saveCollection)}
                <div className="collection-wrapper">
                  <div className="collection-image-wrapper">
                    <div className="image-overlay"></div>
                    <img
                      src={collection.imageUrl || noImgCollection}
                      alt={collection.name}
                      className="collection-image"
                    />
                    <span className="collection-save">
                      <span className="collection-total-save">{collection.totalLikes}</span>
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
                  <span className="collection-number-of-recipe">
                    {collection.recipeIds.length} công thức
                  </span>
                  <div className="collection-action">
                    <button
                      className="btn btn-success collection-update"
                      onClick={(e) => updateCollection(e, collection.id, index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Chỉnh sửa
                    </button>
                    <button
                      className="btn btn-danger collection-delete"
                      onClick={(e) => handleDeleteCollection(e, collection.id)}
                    >
                      <FontAwesomeIcon icon={faFilePen} />
                      Xóa
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className={`update-form-modal ${
          idCollectionUpdate || isCreateCollection || isDeleteCollection
            ? "is-display"
            : ""
        }`}
      ></div>
      <div
        className={`update-form-container ${
          idCollectionUpdate || isCreateCollection ? "is-display" : ""
        }`}
      >
        <form className={`update-form`}>
          <div>
            <p>Tên bộ sưu tập</p>
            <input
              type="text"
              className="collection-name-input"
              value={capitalize(collectionNameUpdate)}
              onChange={(e) => setCollectionNameUpdate(e.target.value)}
              placeholder="Nhập tên bộ sưu tập..."
            />
          </div>
          <div>
            <p>Quyền riêng tư</p>
            <select
              className="collection-name-select"
              value={collectionPrivacy}
              onChange={(e) => setCollectionPrivacy(e.target.value)}
            >
              <option value={1}>Công khai</option>
              <option value={0}>Chỉ mình tôi</option>
            </select>
          </div>
          <button
            className="btn btn-success update-collection-button"
            onClick={handleUpdateCollection}
          >
            {isCreateCollection ? "Tạo" : "Cập nhật"}
          </button>
          <button
            className="btn btn-danger update-collection-button"
            onClick={handleCancelUpdateCollection}
          >
            Hủy
          </button>
        </form>
      </div>
      <div
        className={`delete-collection-confirm-notice ${
          isDeleteCollection ? "is-display" : ""
        }`}
      >
        <p>Bạn có chắc chắn muốn xóa bộ sưu tập này không ?</p>
        <div className="delete-collection-button-action">
          <button
            className="btn btn-light"
            onClick={() => setIsDeleteCollection(false)}
          >
            Không
          </button>
          <button className="btn btn-primary" onClick={confirmDeleteCollection}>
            Có
          </button>
        </div>
      </div>
    </div>
  );
}

export default Collection;
