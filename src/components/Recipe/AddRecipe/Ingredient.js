import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import { RecipeContext } from "./AddRecipeContext";
import CategoryItem from "./Category";

const Ingredient = () => {
  const context = useContext(RecipeContext);

  const handleAddButton = (event) => {
    const newIngredient = { name: "", amount: "", unit: "" };
    if (Array.isArray(context?.ingredient)) {
      const ingredientArray = context?.ingredient;
      const index = event.currentTarget.getAttribute("data-index");
      ingredientArray.splice(index + 1, 0, newIngredient);

      context.setIngredient([...ingredientArray]);
    }
    return [ newIngredient ];
  };

  const handleSubButton = (event) => {
    const newIngredient = { name: "", amount: "", unit: "" };
    if(context?.ingredient?.length === 1) return;
    if (Array.isArray(context?.ingredient)) {
      const ingredientArray = context?.ingredient;
      const index = event.currentTarget.getAttribute("data-index");
      ingredientArray.splice(index, 1);

      context.setIngredient([...ingredientArray]);
    }
    return [ newIngredient ];
  };

  const handleUpButton = (event) => {
    const newIngredient = { name: "", amount: "", unit: "" };
    if (Array.isArray(context?.ingredient)) {
      const ingredientArray = context?.ingredient;
      const index = event.currentTarget.getAttribute("data-index");
      if(ingredientArray[Number(index) - 1] === undefined) return;
      
      const slideArray = ingredientArray.splice(index - 1, 2);
      ingredientArray.splice(index - 1, 0, slideArray[1], slideArray[0]);
      console.log(slideArray);
      context.setIngredient([...ingredientArray]);
    }
    return [ newIngredient ];
  };

  const handleDownButton = (event) => {
    const newIngredient = { name: "", amount: "", unit: "" };
    if (Array.isArray(context?.ingredient)) {
      const ingredientArray = context?.ingredient;
      const index = event.currentTarget.getAttribute("data-index");
      if(ingredientArray[Number(index) + 1] === undefined) return;
      
      const slideArray = ingredientArray.splice(index, 2);
      ingredientArray.splice(index, 0, slideArray[1], slideArray[0]);
      context.setIngredient([...ingredientArray]);
    }
    return [ newIngredient ];
  };

  function IngredientItem({ index }) {
    const [name, setName] = useState(context.ingredient[index].name);
    const [amount, setAmount] = useState(context.ingredient[index].amount);
    const [unit, setUnit] = useState(context.ingredient[index].unit);
    
    const handleName = (event) => {
      setName(event.target?.value);
      context.ingredient[index].name = event.target?.value;
    }

    const handleAmount = (event) => {
      setAmount(event.target?.value);
      context.ingredient[index].amount = event.target?.value;
    }

    const handleUnit = (event) => {
      setUnit(event.target?.value);
      context.ingredient[index].unit = event.target?.value;
    }

    return (
      <div className="recipe-ingredient-box">
        <div className="recipe-ingredient__option">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className='recipe-ingredient__option-icon'
            data-index={index}
            onClick={handleAddButton}
          />
          <FontAwesomeIcon
            icon={faCircleMinus}
            className={"recipe-ingredient__option-icon" + ((context?.ingredient?.length === 1) ? ' disable' : '')}
            data-index={index}
            onClick={handleSubButton}
          />
          <FontAwesomeIcon
            icon={faCircleChevronUp}
            className={"recipe-ingredient__option-icon" + ((index === 0) ? ' disable' : '')}
            data-index={index}
            onClick={handleUpButton}
          />
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className={"recipe-ingredient__option-icon" + ((index === context?.ingredient?.length - 1) ? ' disable' : '')}
            data-index={index}
            onClick={handleDownButton}
          />
        </div>
        <div className="recipe-ingredient">
          <input
            type="text"
            name="title"
            placeholder="Tên nguyên liệu"
            value={name}
            onChange={(event) => handleName(event)}
            className={"recipe-ingredient__input"}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Số lượng"
            value={amount}
            onChange={(event) => handleAmount(event)}
            className={"recipe-ingredient__input"}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Đơn vị"
            value={unit}
            onChange={(event) => handleUnit(event)}
            className={"recipe-ingredient__input"}
            required
          />
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-body__section recipe-body__section--ingredient shadow recipe-input-field">
      <h3 className="recipe-body__title">Nguyên liệu</h3>
      {context.ingredient.map((value, index) => {
        return (
          <IngredientItem
            key={index}
            index={index}
          />
        );
      })}
      <h3 className="recipe-body__title">Category</h3>
      {context.category.map((value, index) => {
        return (
          <CategoryItem
            key={index}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Ingredient;
