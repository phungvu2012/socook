import React, { useEffect, useState } from "react";
import Viewer from "react-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import recipeApi from "../../../api/recipeApi";

export function RecipeBreadcrumb({ list = [{ src: "/", name: "Trang chủ" }] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {list.map((value, index, array) => {
          if (index === array.length - 1) {
            return (
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key={index}
              >
                {value.name || " "}
              </li>
            );
          } else {
            return (
              <li className="breadcrumb-item" key={index}>
                <a href={value?.src || "/"}>{value?.name || " "}</a>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}

export function RecipeIcontList({
  token,
  recipeId,
  loading,
  time,
  amount,
  numberLikes,
}) {
  return (
    <React.Fragment>
      {loading ? (
        <p className="placeholder-paragraph placeholder-paragraph--lg"></p>
      ) : (
        <RecipeIcons
          token={token}
          recipeId={recipeId}
          loading={loading}
          time={time}
          amount={amount}
          numberLikesInitial={numberLikes}
        />
      )}
    </React.Fragment>
  );
}

function RecipeIcons({ token, recipeId, time, amount, numberLikesInitial }) {
  const [like, setLike] = useState();
  const [likeNumber, setLikeNumber] = useState(numberLikesInitial);

  useEffect(() => {
    if (!token) return;
    recipeApi
      .checkLike(token, recipeId)
      .then((res) => {
        console.log(res);
        if (res?.data?.messageCode !== 1) throw { res };
        if (res?.data?.like === 1) setLike(true);
        else setLike(false);
        // setLikeNumber(res?.data?.li)
      })
      .catch((err) => {
        console.log("response ", err);
      });
  }, []);

  const handleClick = () => {
    if (!like) {
      recipeApi
        .likeRecipe(token, recipeId)
        .then((res) => {
          console.log("res", res);
          if (res?.data?.messageCode !== 1) throw { res };
          setLike(true);
          setLikeNumber((pre) => pre + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      recipeApi
        .dislikeRecipe(token, recipeId)
        .then((res) => {
          console.log(res);
          if (res?.data?.messageCode !== 1) throw { res };
          setLike(false);
          setLikeNumber((pre) => pre - 1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={time && amount ? "recipe-info" : "placeholder-paragraph"}>
      <div
        className="recipe-info__item recipe-info__item--love"
        onClick={handleClick}
      >
        {like ? (
          <FontAwesomeIcon
            icon={solidHeart}
            className="recipe-info__icon active"
          />
        ) : (
          <FontAwesomeIcon icon={faHeart} className="recipe-info__icon" />
        )}
        <span className="recipe-info__title">Yêu thích</span>
        <span>{likeNumber}</span>
      </div>
      <div className="recipe-info__item">
        <FontAwesomeIcon icon={faClock} className="recipe-info__icon" />
        <span className="recipe-info__title">Thời gian</span>
        <span className={time ? "" : "placeholder-paragraph"}>
          {time ? time : <React.Fragment>&nbsp;&nbsp;</React.Fragment>} phút{" "}
        </span>
      </div>
      <div className="recipe-info__item">
        <FontAwesomeIcon icon={faUser} className="recipe-info__icon" />
        <span className="recipe-info__title">Khẩu phần</span>
        <span className={amount ? "" : "placeholder-paragraph"}>
          {amount ? amount : <React.Fragment>&nbsp;&nbsp;</React.Fragment>}{" "}
          người
        </span>
      </div>
    </div>
  );
}

const LazyLoadingIngredient = () => {
  return (
    <React.Fragment>
      <p className="placeholder-paragraph">&nbsp;</p>
      <p className="placeholder-paragraph">&nbsp;</p>
      <p className="placeholder-paragraph">&nbsp;</p>
      <p className="placeholder-paragraph">&nbsp;</p>
      <p className="placeholder-paragraph placeholder-paragraph--lg">&nbsp;</p>
    </React.Fragment>
  );
};

export function Ingredient({ loading, list, requiredRecipe }) {
  return (
    <div className="recipe-body__section recipe-body__section--ingredient shadow">
      <h3 className="recipe-body__title">Nguyên liệu</h3>
      {list?.length && !loading ? (
        list.map((value, index) => {
          return (
            <p className="recipe-body__item--ingredient" key={index}>
              {value.name} {value.quantity}
            </p>
          );
        })
      ) : (
        <LazyLoadingIngredient />
      )}
      <div>
        <h3 className="recipe-body__title fs-4 mt-5">Yêu cầu thành phẩm</h3>
        <div className="recipe-step-box border-start-0 border-end-0 rounded-0 mt-2">
          <p>{requiredRecipe}</p>
        </div>
      </div>
    </div>
  );
}

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

const randomArr = () => {
  const random = Math.floor(Math.random() * 4 + 1);
  const arr = [];
  for (let i = 0; i < random; ++i) {
    arr.push("");
  }
  return arr;
};

const LazyLoadingStepRecipe = ({ stepList = ["", "", ""] }) => {
  return (
    <React.Fragment>
      {stepList?.length &&
        stepList.map((value, index) => {
          const arr = randomArr();
          return (
            <React.Fragment key={index}>
              {arr.length &&
                arr.map((value, index) => {
                  return (
                    <p className="placeholder-paragraph" key={index}>
                      &nbsp;
                    </p>
                  );
                })}
              <p className="placeholder-paragraph placeholder-paragraph--xl">
                &nbsp;
              </p>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

const revertToImageList = (step, imageUrlList) => {
  if (!imageUrlList) return;
  let imageList = imageUrlList.trim();

  imageList = imageList.split(" ");

  imageList = imageList.map((value) => {
    return {
      src: value,
      alt: `Bước ${step}`,
    };
  });
  return imageList;
};

export function StepComponent({ loading, stepList = ["", "", ""] }) {
  return (
    <React.Fragment>
      {loading ? (
        <LazyLoadingStepRecipe />
      ) : (
        <React.Fragment>
          {stepList?.length &&
            stepList.map((value, index) => {
              const imageList = revertToImageList(index, value.image_url_list);
              return (
                <React.Fragment key={index}>
                  <p>
                    <b>{value.number}.</b> {value.content}
                  </p>
                  <StepListImages
                    loading={loading}
                    stepNumber={value.number}
                    images={imageList}
                  />
                </React.Fragment>
              );
            })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default function TagRecipe({ categorys }) {
  return (
    <div className="recipe-tag">
      {categorys && (
        <>
          <span>Tags: </span>
          {categorys.map((value, index) => {
            return (
              <a href="#" className="recipe-tag__item" key={index}>
                {value.name}
              </a>
            );
          })}
        </>
      )}
    </div>
  );
}
