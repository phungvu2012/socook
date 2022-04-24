import "./Collection.css";
import { getToken } from "./../../../features/sessionStorage";
import { useState, useEffect } from "react";
import axios from "axios";
// import axiosClient from "../../../api/axiosClient";
import noImgCollection from "./../../../assets/image/noImageCollection/no-image-collection.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faFilePen,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

function Collection() {
  const [userCollection, setUserCollection] = useState([]);
  // const [isUpdate, setIsUpdate] = useState(false)
  const [idCollectionUpdate, setIdCollectionUpdate] = useState();
  const [collectionNameUpdate, setCollectionNameUpdate] = useState("");
  const [collectionPrivacy, setCollectionPrivacy] = useState(1);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  // const [indexCollectionUpdate, setIndexCollectionUpdate] = useState();
  const token = getToken();
  const subUrl = "/collections";
  const baseUrl =
    "http://recipeweb-env-1.eba-yjmhmymp.ap-southeast-1.elasticbeanstalk.com";
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const capitalize = (str) => {
    if (!str) return str;
    let strings = str.split(" ");
    return strings
      .map((string) => string.charAt(0).toLocaleUpperCase() + string.slice(1))
      .join(" ");
  };

  const updateCollection = (collectionId, collectionIndex) => {
    setIdCollectionUpdate(collectionId);
    setCollectionNameUpdate(userCollection[collectionIndex].name);
    setCollectionPrivacy(userCollection[collectionIndex].isPublic);
  };

  // const handleCreateCollection = () => {
  //   setCollectionNameUpdate(true);
  // };

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
        await axios
          .post(
            baseUrl + subUrl,
            {
              name: collectionNameUpdate,
              isPublic: collectionPrivacy,
            },
            config
          )
          .then((res) => {
            setIdCollectionUpdate("");
            setCollectionNameUpdate("");
            setCollectionPrivacy(1);
            setIsCreateCollection(false);
          });
      } else {
        await axios
          .put(
            baseUrl + subUrl + `/${idCollectionUpdate}`,
            {
              name: collectionNameUpdate,
              isPublic: collectionPrivacy,
            },
            config
          )
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

  useEffect(() => {
    async function getCollection() {
      const res = await axios.get(baseUrl + subUrl, config);
      setUserCollection([...res.data]);
    }
    getCollection();
  }, [idCollectionUpdate, isCreateCollection]);

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
              <div className="col-3" key={collection.id}>
                {console.log(userCollection)}
                <div className="collection-wrapper">
                  <img
                    src={noImgCollection}
                    alt={collection.name}
                    className="collection-image"
                  />
                  <div className="collection-name">
                    {capitalize(collection.name)}
                  </div>
                  <span className="collection-number-of-recipe">
                    {collection.recipeIds.length} công thức
                  </span>
                  <div className="collection-action">
                    <button
                      className="btn btn-success collection-update"
                      onClick={() => updateCollection(collection.id, index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      Chỉnh sửa
                    </button>
                    <button className="btn btn-danger collection-delete" >
                      <FontAwesomeIcon icon={faFilePen} />
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`update-form-modal ${
          idCollectionUpdate || isCreateCollection ? "is-display" : ""
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
            Cập nhật
          </button>
          <button
            className="btn btn-danger update-collection-button"
            onClick={handleCancelUpdateCollection}
          >
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
}

export default Collection;
