import React, { useEffect, useState, useContext } from "react";
import { RecipeContext } from "./UpdateRecipeContext";
import Viewer from "react-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const LazyLoadingStepImage = () => {
  return (
    <React.Fragment>
      <div className="recipe-body__image-box placeholder-paragraph">
        <div className="recipe-body__image-item">
          <div className="recipe-body__image" />
        </div>
      </div>
      <div className="recipe-body__image-box placeholder-paragraph">
        <div className="recipe-body__image-item"></div>
      </div>
      <div className="recipe-body__image-box placeholder-paragraph">
        <div className="recipe-body__image-item"></div>
      </div>
    </React.Fragment>
  );
};

const Image = ({ value, index, stepNumber = 1, setVisible }) => {
  const context = useContext(RecipeContext);
  const [deleteBtn, setdeleteBtn] = useState(false);
  
  useEffect(() => {
    console.log(context.images)
  }, [deleteBtn])
  
  const handleDeleteImage = () => {
    setdeleteBtn(false);
    console.log(context.images)
    
    const newListImage = [];
    for(let i = 0; i < context.images[stepNumber - 1].length; ++i) {
      console.log(context.images[stepNumber - 1][i])
      if(i !== index) newListImage.push(context.images[stepNumber - 1][i])
    }
    context.setImages({
      ...context.images,
      [stepNumber - 1]: newListImage}
    );
    console.log(newListImage)
    setdeleteBtn(true);
  }
  return (
    <div className="recipe-body__image-box" key={index}>
      <span className="recipe-body__step">{stepNumber}</span>
      <span className="recipe-body__step-close" onClick={handleDeleteImage}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </span>
      <div className="recipe-body__image-item" onClick={() => setVisible(true)}>
        <img
          src={value?.src ? value.src : value}
          className="recipe-body__image"
          alt={value.alt && stepNumber}
        />
      </div>
    </div>
  );
};

export function StepListImages({ loading, stepNumber, images = [] }) {
  const context = useContext(RecipeContext);

  const [visible, setVisible] = useState(false);
  if (!Array.isArray(images)) return;
  return (
    <div className="recipe-body__repice-image">
      {loading ? (
        <LazyLoadingStepImage />
      ) : (
        <React.Fragment>
          {images &&
            images.map((value, index) => {
              return (
                <Image
                  value={value}
                  index={index}
                  stepNumber={stepNumber}
                  key={index}
                  setVisible={(visible) => setVisible(value)}
                />
              );
            })}
          <Viewer
            visible={visible}
            onClose={() => setVisible(false)}
            images={images}
            disableMouseZoom={true}
            drag={false}
            noToolbar={true}
          />
        </React.Fragment>
      )}
    </div>
  );
}
