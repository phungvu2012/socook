import React, { createContext, useEffect, useState } from "react";
import { getToken } from "../../../features/sessionStorage";
import recipeApi from "../../../api/recipeApi";
import { useNavigate } from "react-router-dom";

const RecipeContext = createContext();
const NUMBER_REGEX = /^\d+$/;


function RecipeProvider({ children }) {
  const token = getToken();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [validTitle, setValidTitle] = useState();
  const [errTitle, setErrTitle] = useState('');
  
  const [shortDescription, setShortDescription] = useState('');
  const [validShortDescription, setValidShortDescription] = useState();
  const [errShortDescription, setErrShortDescription] = useState('');

  const [amountOfPeople, setAmountOfPeople] = useState('');
  const [validAmountOfPeople, setValidAmountOfPeople] = useState();
  const [errAmountOfPeople, setErrAmountOfPeople] = useState();
  
  const [cookingTime, setCookingTime] = useState('');
  const [validCookingTime, setValidCookingTime] = useState();
  const [errCookingTime, setErrCookingTime] = useState();

  const [mainImageUrl, setMainImageUrl] = useState();
  const [validMainImageUrl, setValidMainImageUrl] = useState();
  const [errMainImageUrl, setErrMainImageUrl] = useState();

  const [stepContent, setStepContent] = useState(['', '']);
  const [validStepContent, setValidStepContent] = useState(['', '']);
  const [errStepContent, setErrStepContent] = useState();
  
  // {1: imageList, 2: imageList}
  const [images, setImages] = useState({});
  const [validImages, setValidImages] = useState({});
  const [errImages, setErrImages] = useState();
  
  const [category, setCategory] = useState([]);
  const [validCategory, setValidCategory] = useState([]);
  const [errCategory, setErrCategory] = useState();
  
  const [ingredient, setIngredient] = useState([{name: '', amount: '', unit: ''}, {name: '', amount: '', unit: ''}]);
  const [validIngredient, setValidIngredient] = useState([{name: '', amount: '', unit: ''}, {name: '', amount: '', unit: ''}]);
  const [errIngredient, setErrIngredient] = useState()

  // [{stepNumber, previewLink}]
  const [previewImageLinks, setPreviewImageLinks] = useState([])

  // State
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  let [categoryList, setCategoryList] = useState();

  useEffect(() => {
    recipeApi.getCategory()
    .then((response) => {
      console.log("category: ", response);
      setCategoryList(response?.data?.data)
    })

  }, [])

  //Tạo links preview
  useEffect(() => {
    // console.log("content ", stepContent, ' ', stepContent.length)
    console.log("ingredient ", ingredient);
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

  useEffect(() => {
    setValidCategory();
  }, [category])

  // Xoá link ảnh chính preview nếu không dùng đến
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(mainImageUrl?.preview);
    }
  }, [mainImageUrl])

  useEffect(() => {
    console.log('success', success)
    if(success === true) {
      navigate(`/user/recipe-pending`);
    }
  }, [success]);

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
  //Thay đổi ảnh chính Công thức
  const handleChangeMainImage = (ImageObject) => {
    console.log(ImageObject[0])
    if(ImageObject[0]?.type === 'image/png' || ImageObject[0]?.type === 'image/jpg' || ImageObject[0]?.type === 'image/jpeg' || ImageObject[0]?.type === 'image/svg') {
      if(ImageObject[0].size < 15,728,640) {
        const imageObj = ImageObject[0];
        imageObj.preview = URL.createObjectURL(imageObj);
        setValidMainImageUrl(true);
        setMainImageUrl(imageObj);
      }
      else {
        console.log(false)
        setValidMainImageUrl(false);
        alert('Dung lượng ảnh không được vượt quá 15MB')  
        setErrMainImageUrl('Dung lượng ảnh không được vượt quá 15MB')  
      }
    }
    else {
      console.log(false)
      setValidMainImageUrl(false);
      alert('Chỉ chấp nhận ảnh có đuôi jpg, jpeg, svg, png!')
      setErrMainImageUrl('Chỉ chấp nhận ảnh có đuôi jpg, jpeg, svg, png!')
    }
  };
  // Thay đổi tên món ăn
  const handleChangeTitle = (value) => {
    setValidTitle();
    setTitle(value);
  }
  // Thay đổi mô tả món ăn
  const handleChangeShortDescription = (value) => {
    setValidShortDescription();
    setShortDescription(value);
  }
  //Thay đổi thời gian nấu
  const handleChangeCookingTime = (value) => {
    setValidCookingTime(NUMBER_REGEX.test(value));
    if(NUMBER_REGEX.test(value) || value === '') setCookingTime(value || '')
    else {
      setErrCookingTime('Vui lòng điền số vào thời gian nấu.');
    }
  }
  //Thay đổi khẩu phần
  const handleChangeAmountOfPeople = (value) => {
    setValidAmountOfPeople(NUMBER_REGEX.test(value));
    if(NUMBER_REGEX.test(value) || value === '') setAmountOfPeople(value || '')
    else {
      setErrAmountOfPeople('Vui lòng điền số vào khẩu phần ăn.');
    }
  }

  const checkValidAll = () => {
    console.log('click')

    setTitle(preValue => preValue.trim());
    if(title.trim().length === 0) {
      setValidTitle(false);
      setErrTitle('Vui lòng điền tên món ăn');
    }
    
    setShortDescription(preValue => preValue.trim());
    if(shortDescription.trim().length === 0) {
      setValidShortDescription(false);
      setErrShortDescription('Vui lòng điền mô tả món ăn');
    }

    if(!NUMBER_REGEX.test(cookingTime)) {
      setValidCookingTime(false);
      setErrCookingTime('Thời gian nấu không hợp lệ');
    }

    if(cookingTime.length === 0) {
      setValidCookingTime(false);
      setErrCookingTime('Vui lòng điền thời gian nấu')
    }

    if(!NUMBER_REGEX.test(amountOfPeople)) {
      setValidAmountOfPeople(false);
      setErrAmountOfPeople('Khẩu phần ăn không hợp lệ');
    }

    if(amountOfPeople.length === 0) {
      setValidAmountOfPeople(false);
      setErrAmountOfPeople('Vui lòng điền khẩu phần ăn')
    }

    if(ingredient.length === 0) {
      setValidIngredient(false);
      console.log('hello')

      setErrIngredient('Vui lòng điền ít nhất 1 nguyên liệu')
    }

    for(let item of ingredient) {
      if(!item.name || !item.amount || !item.unit) {
        console.log(item.name, ' ', item.amount, ' ', item.unit)
        setValidIngredient(false);
        setErrIngredient('Vui lòng điền đầy đủ các trường')
        break;
      }
    }

    if(stepContent.length === 0) {
      setValidIngredient(false);
      console.log('hello')

      setErrIngredient('Vui có 1 bước');
    }

    if(category.length === 0) {
      setValidCategory(false);
      setErrCategory('Vui lòng chọn ít nhất 2 category');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.response);;
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
    checkValidAll
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export { RecipeContext, RecipeProvider };
