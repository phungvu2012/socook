import React, { createContext, useEffect, useState } from "react";
import { getToken } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import { useNavigate } from "react-router-dom";

const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const token = getToken();
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [amountOfPeople, setamountOfPeople] = useState();
  const [cookingTime, setCookingTime] = useState();

  const [mainImageUrl, setMainImageUrl] = useState();

  const [stepContent, setStepContent] = useState(['', '']);
  // {1: imageList, 2: imageList}
  const [images, setImages] = useState({});
  
  const [category, setCategory] = useState(['']);
  const [ingredient, setIngredient] = useState([{name: '', amount: '', unit: ''}, {name: '', amount: '', unit: ''}]);
  // [{stepNumber, previewLink}]
  const [previewImageLinks, setPreviewImageLinks] = useState([])

  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();
  const [recipeId, setRecipeId] = useState();

  //Tạo links preview
  useEffect(() => {
    // console.log("content ", stepContent, ' ', stepContent.length)
    console.log("images ", ingredient);
    const linkImageList = [];
    for(let key in images) {
      linkImageList[key] = ({
        stepNumber: key,
        links: handlePreviewAvatar(images[key]) 
      })
    }

    setPreviewImageLinks(linkImageList);
  }, [images]);

  // Xoá link ảnh preview không dùng nữa
  useEffect(() => {
    return () => {
      previewImageLinks.map(value => {
        value.links.map(link => {
          URL.revokeObjectURL(link.src)
        })
      })
    }
  }, [previewImageLinks])

  // Xoá link ảnh chính preview nếu không dùng đến
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(mainImageUrl?.preview);
    }
  }, [mainImageUrl])

  // Format lại mảng image
  function handlePreviewAvatar(images = []) {
    // console.log('preview')
    const imageList = [];
    for(let i = 0; i < images.length; ++i) {
      imageList.push({
        src: URL.createObjectURL(images[i]),
        alt: "preview avatar",
      })
    }
    return imageList;
  }

  useEffect(() => {
    if(success === true) {
      setTimeout(() => {
        navigate(`/recipe/${recipeId}`);
      }, 5000)
    }
  }, [success]);

  const handleChangeMainImage = (ImageObject, setElement) => {
    const imageObj = ImageObject[0];
    imageObj.preview = URL.createObjectURL(imageObj);
    setMainImageUrl(imageObj);
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "short_description",
      shortDescription
    );
    formData.append("amount_of_people", amountOfPeople);
    formData.append("cooking_time", cookingTime);
    formData.append("main_image_url", mainImageUrl);
    stepContent?.length && stepContent.forEach((value) => {
      formData.append(
        "stepcontent",
        value
      );

    })
    console.log("stepContent", images);
    for(let i = 0; i < stepContent.length; ++i) {
      console.log("stepContentItem", images[i]);
      for(let j = 0; j < images[i]?.length; ++j) {
        console.log(`imagestep${i+1}`, images[i][j]);
        formData.append(
          `imagestep${i+1}`, 
          images[i][j]
        )
      } 
    }
    
    for(let item of category) {
      console.log('category ' ,item)
      formData.append("category", item);
    }
    
    console.log(ingredient)

    for(let i = ingredient.length - 1; i >= 0; --i) {
      console.log(`${ingredient[i].amount} ${ingredient[i]?.unit} ${ingredient[i]?.name}`)
      formData.append('ingredient', `${ingredient[i]?.amount} ${ingredient[i]?.unit} ${ingredient[i]?.name}`)
    }

    console.log(formData);
    recipeApi
      .createRecipe(token, formData)
      .then((response) => {
        console.log(response);
        if(response?.data?.data?.messageCode !== 1) throw {response};
        setRecipeId(response?.data?.data?.data?.recipe?.id);
        setSuccess(true);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response);;
        // setLoading(false);
      });
  };

  const value = {
    token,
    title,
    setTitle,
    shortDescription,
    setShortDescription,
    amountOfPeople,
    setamountOfPeople,
    cookingTime,
    setCookingTime,
    mainImageUrl,
    setMainImageUrl,
    stepContent,
    setStepContent,
    images,
    setImages,
    category,
    setCategory,
    ingredient,
    setIngredient,
    previewImageLinks,
    handleChangeMainImage,
    handleSubmit,
    loading,
    setLoading
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
