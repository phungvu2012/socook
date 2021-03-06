import React, { createContext, useEffect, useState, useRef } from "react";
import { getToken, getUser } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import userApi from "../../../api/userApi";
import adminApi from "../../../api/adminApi";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../NotFound";

const RecipeContext = createContext();
const NUMBER_REGEX = /^\d+$/;

function RecipeProvider({ children }) {
  const token = getToken();
  const navigate = useNavigate();
  const params = useParams();
  const recipeId = params.recipeId;

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState();
  const [errTitle, setErrTitle] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [validShortDescription, setValidShortDescription] = useState();
  const [errShortDescription, setErrShortDescription] = useState("");

  const [amountOfPeople, setAmountOfPeople] = useState("");
  const [validAmountOfPeople, setValidAmountOfPeople] = useState();
  const [errAmountOfPeople, setErrAmountOfPeople] = useState();

  const [cookingTime, setCookingTime] = useState("");
  const [validCookingTime, setValidCookingTime] = useState();
  const [errCookingTime, setErrCookingTime] = useState();

  const [mainImageUrl, setMainImageUrl] = useState();
  const [validMainImageUrl, setValidMainImageUrl] = useState();
  const [errMainImageUrl, setErrMainImageUrl] = useState();

  const [stepContent, setStepContent] = useState(["", ""]);
  const [validStepContent, setValidStepContent] = useState(["", ""]);
  const [errStepContent, setErrStepContent] = useState();

  // {1: imageList, 2: imageList}
  const [images, setImages] = useState({});
  const [validImages, setValidImages] = useState({});
  const [errImages, setErrImages] = useState();

  const [category, setCategory] = useState([]);
  const [validCategory, setValidCategory] = useState([]);
  const [errCategory, setErrCategory] = useState();

  const [ingredient, setIngredient] = useState([
    { name: "", amount: "", unit: "" },
    { name: "", amount: "", unit: "" },
  ]);
  const [validIngredient, setValidIngredient] = useState([
    { name: "", amount: "", unit: "" },
    { name: "", amount: "", unit: "" },
  ]);
  const [errIngredient, setErrIngredient] = useState();
  const ingredientRecipeRef = useRef(null);

  const [requiredRecipe, setRequiredRecipe] = useState("");

  // [{stepNumber, previewLink}]
  const [previewImageLinks, setPreviewImageLinks] = useState([]);

  // State
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  const [categoryList, setCategoryList] = useState();
  const [authentication, setAuthentication] = useState(true);

  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (recipeId === undefined) setNotFound(true);

    recipeApi.getCategory().then((response) => {
      setCategoryList(response?.data?.data);
    });

    let username;
    userApi
      .userInfo(token)
      .then((response) => {
        username = response?.data?.user?.user_name;
        // console.log(username);
      })
      .catch((err) => {});

    recipeApi
      .getRecipe(token, recipeId)
      .then((response) => {
        console.log("recipe info", response);

        if (response?.data?.messageCode !== 1) throw { response };

        if (username !== response?.data?.data?.recipe?.user_name) {
          setAuthentication(false);
          // console.log('userName', username)
        }

        const data = response?.data?.data;
        setId(response?.data?.data?.recipe?.id);
        setTitle(data?.recipe?.title);
        setShortDescription(data?.recipe?.short_description);
        setAmountOfPeople(data?.recipe?.amount_of_people);
        setCookingTime(data?.recipe?.cooking_time);
        setMainImageUrl({
          preview: data?.recipe?.main_image_url,
        });
        setCategory(
          data?.category?.length && data?.category.map((value) => value.name)
        );
        setRequiredRecipe(data?.recipe?.required_result || "");
        setIngredient(formatIngredient(data?.ingredient));
        const arrStepContent = data?.step?.length
          ? data?.step.map((value) => value?.content)
          : [""];
        setStepContent(arrStepContent);
        setImages(formatImages(data?.step));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    if (authentication === false) {
      adminApi
        .checkToken(token)
        .then((res) => {
          if (res.data.messageCode !== 1) throw { res };
          if (res?.data?.user?.role !== "admin") throw { res };
        })
        .catch((err) => {
          setNotFound(true);
        });
    }
  }, [authentication]);

  //T???o links preview
  useEffect(() => {
    console.log("images", images);
    const linkImageList = [];
    for (let key in images) {
      linkImageList[key] = {
        stepNumber: key,
        links:
          images[key] === undefined
            ? []
            : images[key].map((value) => {
                return value instanceof File
                  ? handlePreviewAvatar([value])[0]
                  : value?.url;
              }),

        // ? handlePreviewAvatar(images[key])
      };
    }

    setPreviewImageLinks(linkImageList);
  }, [images]);

  // Xo?? link ???nh preview kh??ng d??ng n???a
  useEffect(() => {
    return () => {
      previewImageLinks.map((value) => {
        value.links.map((link) => {
          URL.revokeObjectURL(link.src);
        });
      });
    };
  }, [previewImageLinks]);

  useEffect(() => {
    setValidCategory();
  }, [category]);

  // Xo?? link ???nh ch??nh preview n???u kh??ng d??ng ?????n
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(mainImageUrl?.preview);
    };
  }, [mainImageUrl]);

  useEffect(() => {
    if (success === true) {
      console.log("success", success);
      navigate(`/user/recipe-pending`);
    }
  }, [success]);

  const formatIngredient = (values) => {
    const newArr = [];
    for (let item of values) {
      newArr.push({
        name: item.name.trim(),
        amount: item.quantity.split(" ")[0],
        unit: item.quantity.split(" ")[1],
      });
    }
    return newArr;
  };

  // Format l???i m???ng image
  const formatImages = (arr) => {
    const newObj = {};
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i]?.image_url_list !== "") {
        console.log('add image')
        newObj[i] =
          arr[i]?.image_url_list.trim().split(" ").length === 0
            ? []
            : arr[i]?.image_url_list.trim().split(" ");
      }
    }

    const oldKeyObj = {};
    for (let i = 0; i < arr.length; ++i) {
      oldKeyObj[i] =
        arr[i]?.key && arr[i]?.key.split(" ").length !== 0
          ? arr[i]?.key.trim().split(" ")
          : [];
    }

    const addOldKeyArr = {};
    for (let i in newObj) {
      addOldKeyArr[i] = [];
      for (let j in newObj[i]) {
        addOldKeyArr[i].push({ url: newObj[i][j], key: oldKeyObj[i][j] });
      }
    }

    return addOldKeyArr;
  };

  function handlePreviewAvatar(images = []) {
    // console.log('preview')
    const imageList = [];
    for (let i = 0; i < images.length; ++i) {
      imageList.push({
        src: URL.createObjectURL(images[i]),
        alt: "preview avatar",
      });
    }
    return imageList;
  }
  //Thay ?????i ???nh ch??nh C??ng th???c
  const handleChangeMainImage = (ImageObject) => {
    if (
      ImageObject[0]?.type === "image/png" ||
      ImageObject[0]?.type === "image/jpg" ||
      ImageObject[0]?.type === "image/jpeg" ||
      ImageObject[0]?.type === "image/svg"
    ) {
      if (ImageObject[0].size < 15728640) {
        const imageObj = ImageObject[0];
        imageObj.preview = URL.createObjectURL(imageObj);
        setValidMainImageUrl(true);
        setMainImageUrl(imageObj);
      } else {
        setValidMainImageUrl(false);
        alert("Dung l?????ng ???nh kh??ng ???????c v?????t qu?? 15MB");
        setErrMainImageUrl("Dung l?????ng ???nh kh??ng ???????c v?????t qu?? 15MB");
      }
    } else {
      setValidMainImageUrl(false);
      alert("Ch??? ch???p nh???n ???nh c?? ??u??i jpg, jpeg, svg, png!");
      setErrMainImageUrl("Ch??? ch???p nh???n ???nh c?? ??u??i jpg, jpeg, svg, png!");
    }
  };
  // Thay ?????i t??n m??n ??n
  const handleChangeTitle = (value) => {
    setValidTitle();
    setTitle(value);
  };
  // Thay ?????i m?? t??? m??n ??n
  const handleChangeShortDescription = (value) => {
    setValidShortDescription();
    setShortDescription(value);
  };
  //Thay ?????i th???i gian n???u
  const handleChangeCookingTime = (value) => {
    setValidCookingTime(NUMBER_REGEX.test(value));
    if (NUMBER_REGEX.test(value) || value === "") setCookingTime(value || "");
    else {
      setErrCookingTime("Vui l??ng ??i???n s??? v??o th???i gian n???u.");
    }
  };
  //Thay ?????i kh???u ph???n
  const handleChangeAmountOfPeople = (value) => {
    setValidAmountOfPeople(NUMBER_REGEX.test(value));
    if (NUMBER_REGEX.test(value) || value === "")
      setAmountOfPeople(value || "");
    else {
      setErrAmountOfPeople("Vui l??ng ??i???n s??? v??o kh???u ph???n ??n.");
    }
  };

  const checkValidAll = () => {
    setTitle((preValue) => preValue.trim());
    if (title.trim().length === 0) {
      setValidTitle(false);
      setErrTitle("Vui l??ng ??i???n t??n m??n ??n");
    }

    setShortDescription((preValue) => preValue.trim());
    if (shortDescription.trim().length === 0) {
      setValidShortDescription(false);
      setErrShortDescription("Vui l??ng ??i???n m?? t??? m??n ??n");
    }

    if (!NUMBER_REGEX.test(cookingTime)) {
      setValidCookingTime(false);
      setErrCookingTime("Th???i gian n???u kh??ng h???p l???");
    }

    if (cookingTime.length === 0) {
      setValidCookingTime(false);
      setErrCookingTime("Vui l??ng ??i???n th???i gian n???u");
    }

    if (!NUMBER_REGEX.test(amountOfPeople)) {
      setValidAmountOfPeople(false);
      setErrAmountOfPeople("Kh???u ph???n ??n kh??ng h???p l???");
    }

    if (amountOfPeople.length === 0) {
      setValidAmountOfPeople(false);
      setErrAmountOfPeople("Vui l??ng ??i???n kh???u ph???n ??n");
    }

    if (ingredient.length === 0) {
      setValidIngredient(false);

      setErrIngredient("Vui l??ng ??i???n ??t nh???t 1 nguy??n li???u");
    }

    for (let item in ingredient) {
      for (let i in ingredient) {
        if (
          ingredient[item].name.trim().toLocaleLowerCase() ===
            ingredient[i].name.trim().toLocaleLowerCase() &&
          i !== item
        ) {
          console.log("tr??ng");
          setValidIngredient(false);
          setErrIngredient("Kh??ng di???n tr??ng t??n nguy??n li???u");
          ingredientRecipeRef.current.scrollIntoView();
          break;
        }
      }

      if (
        !ingredient[item].name ||
        !ingredient[item].amount ||
        !ingredient[item].unit
      ) {
        setValidIngredient(false);
        setErrIngredient("Vui l??ng ??i???n ?????y ????? c??c tr?????ng");
        break;
      }
    }

    if (stepContent.length === 0) {
      setValidIngredient(false);
      setErrIngredient("Vui c?? 1 b?????c");
    }

    if (category.length < 2) {
      setValidCategory(false);
      setErrCategory("Vui l??ng ch???n ??t nh???t 2 category");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("recipe_id", id);
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("amount_of_people", amountOfPeople);
    formData.append("cooking_time", cookingTime);
    formData.append("main_image_url", mainImageUrl);
    formData.append("required_result", requiredRecipe);
    stepContent?.length &&
      stepContent.forEach((value) => {
        formData.append("stepcontent", value);
      });
    // console.log("stepContent", images);
    for (let i = 0; i < stepContent.length; ++i) {
      // console.log("stepContentItem", images[i]);
      for (let j = 0; j < images[i]?.length; ++j) {
        // console.log(`imagestep${i + 1}`, images[i][j]);
        formData.append(`imagestep${i + 1}`, images[i][j]);
      }

      for (let i = 0; i < stepContent.length; ++i) {
        // console.log("stepContentItem", images[i]);
        let oldKeyString = "";
        for (let j = 0; j < images[i]?.length; ++j) {
          if (images[i][j].key) {
            oldKeyString += " " + images[i][j].key;
          }
        }
        // console.log("images[i][j]: ", oldKeyString.trim());
        formData.append("oldKey", oldKeyString.trim());
      }
    }

    for (let item of category) {
      // console.log("category ", item);
      formData.append("category", item);
    }

    for (let i = ingredient.length - 1; i >= 0; --i) {
      formData.append(
        "ingredient",
        `${ingredient[i]?.amount.trim()} ${ingredient[
          i
        ]?.unit.trim()} ${ingredient[i]?.name.trim()}`
      );
    }

    // console.log(formData);
    recipeApi
      .updateRecipe(token, formData)
      .then((response) => {
        // console.log(response);
        if (response?.data?.data?.messageCode !== 1) throw { response };
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err?.response);
        setLoading(false);
        setSuccess(false);
      });
  };

  const value = {
    token,

    title,
    handleChangeTitle,
    validTitle,
    errTitle,

    shortDescription,
    handleChangeShortDescription,
    validShortDescription,
    errShortDescription,

    amountOfPeople,
    handleChangeAmountOfPeople,
    validAmountOfPeople,
    errAmountOfPeople,

    cookingTime,
    handleChangeCookingTime,
    validCookingTime,
    errCookingTime,

    mainImageUrl,
    setMainImageUrl,
    validMainImageUrl,
    errMainImageUrl,

    stepContent,
    setStepContent,
    validStepContent,
    errStepContent,

    images,
    setImages,
    validImages,
    errImages,

    category,
    setCategory,
    validCategory,
    errCategory,

    ingredient,
    setIngredient,
    validIngredient,
    setValidIngredient,
    errIngredient,

    previewImageLinks,
    handleChangeMainImage,
    handleSubmit,
    loading,
    success,
    setLoading,
    categoryList,
    checkValidAll,
    requiredRecipe,
    setRequiredRecipe,
    ingredientRecipeRef,
  };

  if (notFound) return <NotFound />;

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
