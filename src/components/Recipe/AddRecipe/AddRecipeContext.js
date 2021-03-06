import React, { createContext, useEffect, useState, useRef } from "react";
import { getToken } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import { useNavigate } from "react-router-dom";

const RecipeContext = createContext();
const NUMBER_REGEX = /^\d+$/;

function RecipeProvider({ children }) {
  const token = getToken();
  const navigate = useNavigate();

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

  const [requiredRecipe, setRequiredRecipe] = useState('');

  // [{stepNumber, previewLink}]
  const [previewImageLinks, setPreviewImageLinks] = useState([]);

  // State
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  let [categoryList, setCategoryList] = useState();

  useEffect(() => {
    recipeApi.getCategory().then((response) => {
      console.log("category: ", response);
      setCategoryList(response?.data?.data);
    });
  }, []);

  useEffect(() => {
    console.log(requiredRecipe);
  }, [requiredRecipe])

  //T???o links preview
  useEffect(() => {
    // console.log("content ", stepContent, ' ', stepContent.length)
    const linkImageList = [];
    for (let key in images) {
      linkImageList[key] = {
        stepNumber: key,
        links: handlePreviewAvatar(images[key]),
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
    // console.log("success", success);
    if (success === true) {
      navigate(`/user/recipe-pending`);
    }
  }, [success]);

  // Format l???i m???ng image
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
    // console.log(ImageObject[0]);
    if (
      ImageObject[0]?.type === "image/png" ||
      ImageObject[0]?.type === "image/jpg" ||
      ImageObject[0]?.type === "image/jpeg" ||
      ImageObject[0]?.type === "image/svg"
    ) {
      if ((ImageObject[0].size < 15, 728, 640)) {
        const imageObj = ImageObject[0];
        imageObj.preview = URL.createObjectURL(imageObj);
        setValidMainImageUrl(true);
        setMainImageUrl(imageObj);
      } else {
        // console.log(false);
        setValidMainImageUrl(false);
        alert("Dung l?????ng ???nh kh??ng ???????c v?????t qu?? 15MB");
        setErrMainImageUrl("Dung l?????ng ???nh kh??ng ???????c v?????t qu?? 15MB");
      }
    } else {
      // console.log(false);
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
    // console.log("click");

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
        // console.log(ingredient[item].name === ingredient[i].name, '-', i !==  item, '-', ingredient[item].name, '-', ingredient[i].name)
        if ((ingredient[item].name.trim().toLocaleLowerCase() === ingredient[i].name.trim().toLocaleLowerCase()) && (i !== item)) {
          setValidIngredient(false);
          setErrIngredient("Kh??ng di???n tr??ng t??n nguy??n li???u");
          ingredientRecipeRef.current.scrollIntoView();
          break;
        }
      }

      if (!ingredient[item].name || !ingredient[item].amount || !ingredient[item].unit) {
        // console.log(ingredient[item].name, " ", ingredient[item].amount, " ", ingredient[item].unit);
        setValidIngredient(false);
        setErrIngredient("Vui l??ng ??i???n ?????y ????? c??c tr?????ng");
        break;
      }
    }

    if (stepContent.length === 0) {
      setValidIngredient(false);

      setErrIngredient("C?? ??t nh???t 1 b?????c ???????c t???o");
    }

    if (category.length === 0) {
      setValidCategory(false);
      setErrCategory("Vui l??ng ch???n ??t nh???t 1 danh m???c m??n ??n");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("amount_of_people", amountOfPeople);
    formData.append("cooking_time", cookingTime);
    formData.append("main_image_url", mainImageUrl);
    formData.append('required_result', requiredRecipe);
    stepContent?.length &&
      stepContent.forEach((value) => {
        formData.append("stepcontent", value);
      });
    for (let i = 0; i < stepContent.length; ++i) {
      for (let j = 0; j < images[i]?.length; ++j) {
        formData.append(`imagestep${i + 1}`, images[i][j]);
      }
    }

    for (let item of category) {
      formData.append("category", item);
    }

    for (let i = ingredient.length - 1; i >= 0; --i) {
      // console.log(
      //   `${ingredient[i].amount} ${ingredient[i]?.unit} ${ingredient[i]?.name}`
      // );
      formData.append(
        "ingredient",
        `${ingredient[i]?.amount} ${ingredient[i]?.unit} ${ingredient[i]?.name}`
      );
    }

    // console.log(formData);
    recipeApi
      .createRecipe(token, formData)
      .then((response) => {
        // console.log(response);
        if (response?.data?.data?.messageCode !== 1) throw { response };
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err?.response);
        setLoading(false);
        if(err?.response?.status === 404) setSuccess(false);
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

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
