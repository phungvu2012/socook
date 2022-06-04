import React, { useContext, useEffect, useState } from "react";

import { RecipeContext } from "./AddRecipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleMinus,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { StepListImages } from "../RecipeInfo/section";

const StepComponent = () => {
  const context = useContext(RecipeContext);

  const handleAddButton = (event) => {
    if (Array.isArray(context?.stepContent)) {
      const stepContentArray = [...context?.stepContent];
      const index = event.currentTarget.getAttribute("data-index");
      stepContentArray.splice(index + 1, 0, "");

      context.setStepContent([...stepContentArray]);

      console.log("add ", Number(index), " ", context?.stepContent?.length);
      let sortImage = { ...context.images };
      for (let i = context.stepContent.length; i >= Number(index) + 1; --i) {
        console.log("i: ", i);
        console.log("image: ", sortImage[i - 1]);
        if (i === Number(index) + 1)
          sortImage = {
            ...sortImage,
            [i]: undefined,
          };
        else {
          console.log("add");
          sortImage = {
            ...sortImage,
            [i]: sortImage[i - 1],
          };
        }
        console.log("images: ", context.images);
      }

      context.setImages(sortImage);
    }
    return [""];
  };

  const handleSubButton = (event) => {
    if (context?.stepContent?.length === 1) return;
    if (Array.isArray(context?.stepContent)) {
      const stepContentArray = [...context?.stepContent];
      const index = event.currentTarget.getAttribute("data-index");
      stepContentArray.splice(index, 1);

      context.setStepContent([...stepContentArray]);

      console.log("sub ", Number(index), " ", context?.stepContent?.length);
      let sortImage = { ...context.images };
      for (let i = Number(index); i < context.stepContent.length - 1; ++i) {
        console.log("i: ", i);
        console.log("image: ", sortImage[i - 1]);

        console.log("sub");
        sortImage = {
          ...sortImage,
          [i]: sortImage[i + 1],
        };
        console.log("images: ", context.images);
      }

      context.setImages(sortImage);
    }
    return [""];
  };

  const handleUpButton = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    if (index === context.stepContent.length - 1) return;
    if (Array.isArray(context?.stepContent)) {
      const stepContentArray = context?.stepContent;
      if (stepContentArray[Number(index) - 1] === undefined) return;

      const slideArray = stepContentArray.splice(index - 1, 2);
      stepContentArray.splice(index - 1, 0, slideArray[1], slideArray[0]);
      context.setStepContent([...stepContentArray]);
      let sortImage = { ...context.images };
      console.log("Down ");
      console.log("1: ", sortImage[Number(index)]);
      console.log("2: ", sortImage[Number(index) + 1]);
      context.setImages({
        ...sortImage,
        [index]: sortImage[Number(index) - 1],
        [Number(index) - 1]: sortImage[index],
      });
    }
    return [""];
  };

  const handleDownButton = (event) => {
    const index = event.currentTarget.getAttribute("data-index");
    if (index === context?.stepContent?.length - 1) return;
    if (Array.isArray(context?.stepContent)) {
      const stepContentArray = context?.stepContent;
      if (stepContentArray[Number(index) + 1] === undefined) return;

      const slideArray = stepContentArray.splice(index, 2);
      stepContentArray.splice(index, 0, slideArray[1], slideArray[0]);
      context.setStepContent([...stepContentArray]);

      let sortImage = { ...context.images };
      console.log("Down ");
      console.log("1: ", sortImage[Number(index)]);
      console.log("2: ", sortImage[Number(index) + 1]);
      context.setImages({
        ...sortImage,
        [index]: sortImage[Number(index) + 1],
        [Number(index) + 1]: sortImage[index],
      });
    }
    return [""];
  };

  function StepItem({ index }) {
    const [content, setContent] = useState(context.stepContent[index]);

    const handleContent = (value) => {
      setContent(value);
      context.stepContent[index] = value;
    };

    const handleChangeStepImage = (step, ImageObject) => {
      console.log(ImageObject);
      const imageObj = ImageObject;

      context.setImages({
        ...context?.images,
        [step]: imageObj,
      });
    };
    // console.log(context.previewImageLinks)
    return (
      <div className="recipe-step-box">
        <div className="recipe-step__option">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="recipe-step__option-icon"
            data-index={index}
            onClick={handleAddButton}
          />
          <FontAwesomeIcon
            icon={faCircleMinus}
            className={
              "recipe-step__option-icon" +
              (context?.stepContent?.length === 1 ? " disable" : "")
            }
            data-index={index}
            onClick={handleSubButton}
          />
          <label htmlFor={"image" + index}>
            <FontAwesomeIcon
              icon={faImage}
              className="recipe-step__option-icon"
              data-index={index}
            />
          </label>
          <FontAwesomeIcon
            icon={faCircleChevronUp}
            className={
              "recipe-step__option-icon" + (index === 0 ? " disable" : "")
            }
            data-index={index}
            onClick={handleUpButton}
          />
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            className={
              "recipe-step__option-icon" +
              (index === context?.stepContent?.length - 1 ? " disable" : "")
            }
            data-index={index}
            onClick={handleDownButton}
          />
        </div>
        <input
          type="file"
          multiple
          accept="image/jpg, image/jpeg, image/png, image/svg"
          id={"image" + index}
          style={{ display: "none" }}
          onChange={(event) => {
            handleChangeStepImage(index, event.target.files);
          }}
        />
        <h6>Bước {index + 1}:</h6>
        <div className="recipe-step">
          <textarea
            type="text"
            name="title"
            placeholder={`Nội dung bước ${index + 1}`}
            value={content}
            onChange={(event) => handleContent(event.target?.value)}
            className={"recipe-step__input"}
            required
          />
        </div>
        <StepListImages
          images={context.previewImageLinks[index]?.links}
          stepNumber={index + 1}
        />
      </div>
    );
  }

  return (
    <div
      className={
        "recipe-body__section shadow recipe-input-field" +
        (context.validStepContent === false ? " error" : "")
      }
    >
      <div className="recipe-body__step-list">
        <h3 className="recipe-body__title">
          Cách làm<span className="text-danger">*</span>
        </h3>
        {context?.stepContent &&
          context.stepContent.map((value, index) => {
            return <StepItem key={index} index={index} />;
          })}
      </div>
      <div className="recipe-tag"></div>
    </div>
  );
};

export default StepComponent;
