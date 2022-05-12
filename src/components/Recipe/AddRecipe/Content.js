import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import "./../RecipeInfo/recipe.scss";
import "./create-recipe.scss";

import StepComponent from "./StepComponent";
import { RecipeContext } from "./AddRecipeContext";
import Ingredient from "./Ingredient"

const Content = () => {
  const context = useContext(RecipeContext);

  return (
      <div className="recipe-page recipe-page--create">
        <div className="container py-3">
          <h2> Đăng công thức mới</h2>
          <div className="recipe-header">
            <div className="recipe-header__left">
              <div
                className="recipe-header__image-box recipe-input-field"
                style={{ backgroundImage: `url(${context?.mainImageUrl?.preview})` }}
              >
                <label
                  htmlFor="main-image"
                  style={{ height: "100%", width: "100%", cursor: "pointer" }}
                />
                <input
                  type="file"
                  multiple
                  onChange={(event) =>
                    context?.handleChangeMainImage(event.target.files)
                  }
                  style={{ display: "none" }}
                  id="main-image"
                />
              </div>
            </div>
            <div className="recipe-header__right">
              <div className="recipe-header__right-top recipe-input-field">
                <input
                  type="text"
                  name="title"
                  placeholder="Nhập tên món ăn"
                  onChange={(event) => context?.setTitle(event.target.value)}
                  className={
                    "recipe-header__title recipe-input recipe-input--title"
                  }
                  required
                />
                <textarea
                  name="description"
                  placeholder="Mô tả món ăn"
                  onChange={(event) => context?.setShortDescription(event.target.value)}
                  className={
                    "recipe-input recipe-input--description"
                  }
                  required
                ></textarea>
              </div>
              <div className="recipe-info">
                <div className="recipe-info__field recipe-input">
                  <FontAwesomeIcon icon={faClock} className="recipe-info__icon" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Thời gian nấu (phút)"
                    className="recipe-info__input"
                    onChange={event => context?.setCookingTime(event.target.value)}
                  />
                  <span>(phút)</span>
                </div>
                <div className="recipe-info__field recipe-input">
                  <FontAwesomeIcon icon={faUser} className="recipe-info__icon" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Khẩu phần (người)"
                    className="recipe-info__input"
                    onChange={event => context?.setamountOfPeople(event.target.value)}
                  />
                  <span>(người)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="recipe-body">
            <Ingredient />
            <StepComponent />
          </div>
          <div style={{textAlign: 'right'}}>
            <button
              onClick={context.handleSubmit}
              className="btn btn-primary rounded-pill btn--form"
            >
              {context.loading ? (
                <React.Fragment>
                  <div
                    className="spinner-border text-light"
                    style={{ width: "1rem", height: "1rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span> Loading...</span>
                </React.Fragment>
              ) : (
                "Gửi"
              )}
            </button>
          </div>
        </div>
      </div>
  );
};
export default Content;
