import React, {useState, useEffect} from 'react'
import Viewer from "react-viewer";

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
  
  export function StepListImages({ loading, stepNumber, images = [] }) {
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
                  <div className="recipe-body__image-box" key={index}>
                    <span className="recipe-body__step">{stepNumber}</span>
                    <div
                      className="recipe-body__image-item"
                      onClick={() => setVisible(true)}
                    >
                      <img
                        src={value?.src ? value.src : value}
                        className="recipe-body__image"
                        alt={value.alt && stepNumber}
                      />
                    </div>
                  </div>
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