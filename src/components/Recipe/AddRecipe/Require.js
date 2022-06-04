import React, { useEffect, useState, useContext } from "react";
import { RecipeContext } from "./AddRecipeContext";


const Require = () => {
  const context = useContext(RecipeContext);
  const [content, setContent] = useState(context.requiredRecipe);

  const handleContent = (content) => {
    setContent(content);
    context.setRequiredRecipe(content);
  }

  useEffect(() => {
    console.log(content)
  }, [content]);

  return (
    <div>
      <h3 className="recipe-body__title">Yêu cầu thành phẩm</h3>
      <div className="recipe-step-box border-start-0 border-end-0 rounded-0 mt-2">
        <textarea
          type="text"
          name="title"
          placeholder={`Nhập yêu cầu thành phẩm`}
          value={content}
          onChange={(event) => handleContent(event.target?.value)}
          className={"recipe-step__input"}
        />
      </div>
    </div>
  );
};

export default Require;
