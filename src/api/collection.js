import axiosHost2 from "./axiosHost2";
class Collection {
  getCollection = (token) => {
    const COLLECTION_URL = process.env.REACT_APP_COLLECTION_URL;
    return axiosHost2.get(COLLECTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  deleteCollection = (token, idCollectionDelete) => {
    const COLLECTION_URL =
      process.env.REACT_APP_COLLECTION_URL + `/${idCollectionDelete}`;
    return axiosHost2.delete(COLLECTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  updateCollection = (token, idCollectionUpdate, collectionObj) => {
    const COLLECTION_URL =
      process.env.REACT_APP_COLLECTION_URL + `/${idCollectionUpdate}`;
    return axiosHost2.put(COLLECTION_URL, collectionObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  createCollection = (token, collectionObj) => {
    const COLLECTION_URL = process.env.REACT_APP_COLLECTION_URL;
    return axiosHost2.post(COLLECTION_URL, collectionObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  addRecipeToCollection = (token, idCollection, idRecipeDelete) => {
    const COLLECTION_URL =
      process.env.REACT_APP_COLLECTION_URL +
      `/${idCollection}/${idRecipeDelete}`;
    return axiosHost2.post(
      COLLECTION_URL,
      {
        testData: "Add success",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  deleteRecipeInCollection = (token, idCollection, idRecipeDelete) => {
    const COLLECTION_URL =
      process.env.REACT_APP_COLLECTION_URL +
      `/${idCollection}/${idRecipeDelete}`;
    return axiosHost2.delete(COLLECTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  getCollectionSave = (token) => {
    const COLLECTION_URL = process.env.REACT_APP_INTERACTION_URL;
    return axiosHost2.get(COLLECTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  saveCollection = (token, collectionId) => {
    const COLLECTION_URL =
      process.env.REACT_APP_INTERACTION_URL + `/${collectionId}`;
    const fakeData = {
      id: collectionId,
    };
    return axiosHost2.post(COLLECTION_URL, fakeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  unsaveCollection = (token, collectionId) => {
    const COLLECTION_URL =
      process.env.REACT_APP_INTERACTION_URL + `/${collectionId}`;
    return axiosHost2.delete(COLLECTION_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

const collection = new Collection();

export default collection;
