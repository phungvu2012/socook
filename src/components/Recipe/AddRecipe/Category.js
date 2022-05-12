import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import { RecipeContext } from "./AddRecipeContext";

function CategoryItem({index}) {
  const context = useContext(RecipeContext);
  const [name, setName] = useState(context.category[index]);

  useEffect(() => {

  }, [name])

  const handleName = (event) => {
    setName(event.target?.value);
    context.category[index] = event.target?.value;
  }

  const handleAddButton = (event) => {
    if (Array.isArray(context?.category)) {
      const categoryArray = context?.category;
      const index = event.currentTarget.getAttribute("data-index");
      categoryArray.splice(index + 1, 0, '');
      console.log(categoryArray)
      context.setCategory([...categoryArray]);
    }
    return [''];
  };

  const handleSubButton = (event) => {
    if(context?.category?.length === 1) return;
    if (Array.isArray(context?.category)) {
      const categoryArray = context?.category;
      const index = event.currentTarget.getAttribute("data-index");
      categoryArray.splice(index, 1);

      context.setCategory([...categoryArray]);
    }
    return [''];
  };

  // const handleUpButton = (event) => {
  //   if (Array.isArray(context?.category)) {
  //     const categoryArray = context?.category;
  //     const index = event.currentTarget.getAttribute("data-index");
  //     if (categoryArray[Number(index) - 1] === undefined) return;

  //     const slideArray = categoryArray.splice(index - 1, 2);
  //     categoryArray.splice(index - 1, 0, slideArray[1], slideArray[0]);
  //     console.log(categoryArray);
  //     context.setCategory([...categoryArray]);
  //   }
  //   return [''];
  // };

  // const handleDownButton = (event) => {
  //   if (Array.isArray(context?.category)) {
  //     const categoryArray = context?.category;
  //     const index = event.currentTarget.getAttribute("data-index");
  //     if (categoryArray[Number(index) + 1] === undefined) return;
  //     console.log("Down ", categoryArray)

  //     const slideArray = categoryArray.splice(index, 2);
  //     categoryArray.splice(index, 0, slideArray[1], slideArray[0]);
  //     context.setCategory([...categoryArray]);
  //   }
  //   return [''];
  // };

  return (
    <div className="recipe-category-box">
      <div className="recipe-category__option">
        <FontAwesomeIcon
          icon={faCirclePlus}
          className="recipe-category__option-icon"
          data-index={index}
          onClick={handleAddButton}
        />
        <FontAwesomeIcon
          icon={faCircleMinus}
          className={"recipe-category__option-icon" + ((context?.category?.length === 1) ? ' disable' : '')}
          data-index={index}
          onClick={handleSubButton}
        />
        {/* <FontAwesomeIcon
          icon={faCircleChevronUp}
          className={
            "recipe-category__option-icon" + (index === 0 ? " disable" : "")
          }
          data-index={index}
          onClick={handleUpButton}
        />
        <FontAwesomeIcon
          icon={faCircleChevronDown}
          className={
            "recipe-category__option-icon" +
            (index === context?.category?.length - 1 ? " disable" : "")
          }
          data-index={index}
          onClick={handleDownButton}
        /> */}
      </div>
      <div className="recipe-category">
        <input
          type="text"
          name="title"
          placeholder="Tên"
          value={name}
          onChange={handleName}
          className={"recipe-category__input"}
          required
        />
      </div>
    </div>
  );
}

export default CategoryItem;
