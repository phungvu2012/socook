import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import "./../RecipeInfo/recipe.scss";
import "./create-recipe.scss";

import StepComponent from "./StepComponent";
import { RecipeContext } from "./AddRecipeContext";
import Ingredient from "./Ingredient";
import Category from "./Category";

const Content = () => {
  const context = useContext(RecipeContext);

  return (
    <div className="recipe-page recipe-page--create">
      <div className="container py-3">
        <h2 className="recipe-title"> Đăng công thức mới</h2>
        <form onSubmit={context.handleSubmit}>
          <div className="recipe-header">
            <div className="recipe-header__left">
              <div
                className="recipe-header__image-box recipe-input-field"
                style={{
                  backgroundImage: `url(${context?.mainImageUrl?.preview})`,
                }}
              >
                <label
                  htmlFor="main-image"
                  style={{
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    textAlign: "center",
                    lineHeight: "10rem",
                  }}
                >
                  {context?.validMainImageUrl === false && (
                    <p className="text-danger">- {context?.errMainImageUrl}</p>
                  )}
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(event) =>
                    context?.handleChangeMainImage(event.target.files)
                  }
                  accept="jpg|jpge|png"
                  style={{ display: "none" }}
                  id="main-image"
                />
              </div>
              <label
                htmlFor="main-image"
                className="recipe-header__notifi-add-image"
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  className="recipe-header__notifi-add-image-icon"
                />
                <span> Nhấn để thêm hình ảnh</span>
              </label>
            </div>
            <div className="recipe-header__right">
              <div className="recipe-header__right-top recipe-input-field">
                <input
                  type="text"
                  name="title"
                  placeholder="Nhập tên món ăn"
                  onChange={(event) =>
                    context.handleChangeTitle(event.target.value)
                  }
                  value={context.title}
                  className={
                    "recipe-header__title recipe-input recipe-input--title" +
                    (context.validTitle === undefined
                      ? ""
                      : context.validTitle
                      ? " success"
                      : " error")
                  }
                  autoFocus
                  required
                />
                {context?.validTitle === false && (
                  <p className="text-danger">- {context?.errTitle}</p>
                )}
                <textarea
                  name="description"
                  placeholder="Mô tả món ăn  
                        - Đây là món ăn của vùng miền nào?
                        - Hương vị có gì đặc sắc, nổi bật?
                        - Thích hợp ăn lúc nào?
                        - Có tác dụng gì đặc biệt không?
                        - Độ tuổi phù hợp?"
                  onChange={(event) =>
                    context?.handleChangeShortDescription(event.target.value)
                  }
                  value={context.shortDescription}
                  className={
                    "recipe-input recipe-input--description" +
                    (context.validShortDescription === undefined
                      ? ""
                      : context.validShortDescription
                      ? " success"
                      : " error")
                  }
                  required
                ></textarea>
                {context?.validShortDescription === false && (
                  <p className="text-danger">
                    - {context?.errShortDescription}
                  </p>
                )}
              </div>
              <div className="recipe-info">
                <div
                  className={
                    "recipe-info__field recipe-input" +
                    (context.validCookingTime === undefined
                      ? ""
                      : (context.validCookingTime || context.cookingTime)
                      ? " success"
                      : " error")
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className="recipe-info__icon"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Thời gian nấu (phút)"
                    className="recipe-info__input"
                    value={context.cookingTime}
                    onChange={(event) =>
                      context?.handleChangeCookingTime(event.target.value)
                    }
                  />
                  <span>(phút)</span>
                </div>
                {context?.validCookingTime === false && (
                  <p className="text-danger">- {context?.errCookingTime}</p>
                )}
                <div
                  className={
                    "recipe-info__field recipe-input" +
                    (context.validAmountOfPeople === undefined
                      ? ""
                      : (context.validAmountOfPeople || context.amountOfPeople)
                      ? " success"
                      : " error")
                  }
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="recipe-info__icon"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Khẩu phần (người)"
                    className="recipe-info__input"
                    value={context.amountOfPeople}
                    onChange={(event) =>
                      context?.handleChangeAmountOfPeople(event.target.value)
                    }
                  />
                  <span>(người)</span>
                </div>
                {context?.validAmountOfPeople === false && (
                  <p className="text-danger">- {context?.errAmountOfPeople}</p>
                )}
              </div>
            </div>
          </div>
          <div className="recipe-body">
            <Ingredient />
            <StepComponent />
          </div>
          <div className={"category-body shadow" + ((context.validCategory === false) ? ' error' : '')}>
            <h3 className="recipe-body__title">Category</h3>
            {(context.validCategory === false) && <p className="text-danger">- {context.errCategory}</p>}
            <Category />
          </div>
          <div style={{ textAlign: "right" }}>
            <button
              onClick={context.checkValidAll}
              className="button"
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
        </form>
      </div>
    </div>
  );
};
export default Content;
