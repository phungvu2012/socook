import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCirclePlus,
  faCircleChevronDown,
  faCircleChevronUp,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";

import logo from "../../../assets/image/logo/Logo_SoCook_vertical_3.png";
import foodPhoto from "../../../assets/image/login/pexels-pixabay-357573.jpg";

import "./../recipe.scss";
import "./create-recipe.scss";
import recipeApi from "../../../api/recipeApi";
import { getToken } from "../../../features/sessionStorage";
import { ReadMore } from "../../../features/editorText";
import { StepComponent } from "../RecipeInfo/section";
import { handlePreviewAvatar } from "./section";
import { Editor, EditorState, RichUtils } from "draft-js";

const CreateRepice = () => {
  const token = getToken();

  const [title, setTitle] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [amountOfPeople, setamountOfPeople] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [mainImageUrl, setMainImageUrl] = useState();
  const [stepcontent, setStepcontent] = useState();
  const [imagestep, setImagestep] = useState({});
  const [category, setCategory] = useState();
  const [ingredient, setIngredient] = useState();

  useEffect(() => {
    console.log(mainImageUrl);
  }, [mainImageUrl]);

  useEffect(() => {
    console.log(imagestep);
  }, [imagestep]);

  const handleChangeMainImage = (ImageObject, setElement) => {
    const imageObj = ImageObject[0];
    setElement(imageObj);
  };

  const handleChangeStepImage = (step, ImageObject, setElement) => {
    const imageObj = ImageObject;
    const ImageKeyName = `step${step}`;
    setElement((prevState) => ({
      ...prevState,
      [ImageKeyName]: imageObj,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", "Sữa Chua Trân Châu Trái Cây");
    formData.append(
      "short_description",
      "Sữa chua trân châu trái cây là một trong những món ăn ngon, thanh mát được nhiều người yêu thích trong mùa hè. Với sữa chua bổ dưỡng mát lạnh, kết hợp với trái cây tươi mọng nước thêm trân châu nước cốt dừa giòn giòn béo ngậy, sẽ đánh tan ngay cơn nóng mùa hè. Hãy thử ngay món ăn giải nhiệt ngon lành này nhé."
    );
    formData.append("amount_of_people", 3);
    formData.append("cooking_time", 30);
    formData.append("main_image_url", mainImageUrl);
    formData.append(
      "stepcontent",
      "Làm trân châu nước cốt dừa: Đầu tiên, bắt nồi nước sôi, rồi cho 100gr trân châu trắng vào luộc 30 phút cho chín, rồi vớt ra cho vào thau nước lạnh để nguội."
    );
    formData.append(
      "stepcontent",
      "Cho 200ml nước cốt dừa vào nồi, thêm 60gr sữa đặc. nấu cho sôi lăn tăn rồi cho từ từ 5gr bột bắp pha loãng đến khi nước cốt dừa hơi sệt lại. Tiếp theo cho tiếp trân châu trắng đẫ luộc vào khuấy đều rồi tắt bếp."
    );
    formData.append(
      "stepcontent",
      "Làm sữa chua: Cho 240ml kem tươi vào nồi, thêm 70gr đường cát và 240ml sữa tươi thanh trùng Dalatmilk, sau đó đun ấm 60-70 độ cho tan đường, rồi để nguội còn 40 độ."
    );
    formData.append(
      "stepcontent",
      "Cho 120gr sữa chua ăn Dalatmilk ra tô, đổ hỗn hợp sữa tươi vào khuấy đều, dùng màng bọc thực phẩm bọc kín miệng tô lại. Cho vào nồi to, đổ nước ấm 60 độ vào ngang tô, rồi đậy kín nắp, sau đó ủ trong vòng 8 tiếng, rồi cho vào ngăn đông tủ lạnh thêm 4 tiếng nữa để sữa chua đông hoàn toàn."
    );
    formData.append(
      "stepcontent",
      "Khi sữa chua đông lại thì múc thành viên cho vào ly, rồi cho thêm trân châu nước cốt dừa, mứt dâu và dâu tươi lên trên, trang trí thêm nhánh húng lũi để món ăn thêm phần hấp dẫn hơn."
    );
    formData.append(
      "stepcontent",
      "Sữa chua rất tốt cho sức khỏe được nhiều gia đình yêu thích và có thể sử dụng hàng ngày. Nay thêm chút biến tấu với trân châu nước cốt dừa dai dai béo ngậy, mứt dâu ngọt ngào và dâu tươi mộng nước, sẽ tạo nên một món sữa chua trân châu trái cây mát lạnh, thơm ngon từ trái cây tươi cực an toàn và bổ dưỡng."
    );
    formData.append("imagestep1", imagestep.step1[0]);
    formData.append("imagestep1", imagestep.step1[1]);
    formData.append("imagestep2", imagestep.step2[0]);
    formData.append("imagestep2", imagestep.step2[1]);
    formData.append("imagestep2", imagestep.step2[2]);
    formData.append("imagestep2", imagestep.step2[3]);
    formData.append("imagestep3", imagestep.step3[0]);
    formData.append("imagestep3", imagestep.step3[1]);
    formData.append("imagestep3", imagestep.step3[2]);
    formData.append("imagestep3", imagestep.step3[3]);
    formData.append("imagestep4", imagestep.step4[0]);
    formData.append("imagestep4", imagestep.step4[1]);
    formData.append("imagestep4", imagestep.step4[2]);
    formData.append("imagestep4", imagestep.step4[3]);
    formData.append("imagestep5", imagestep.step5[1]);
    formData.append("imagestep5", imagestep.step5[2]);
    formData.append("imagestep5", imagestep.step5[3]);
    formData.append("imagestep5", imagestep.step5[4]);
    formData.append("imagestep6", imagestep.step6[0]);
    formData.append("imagestep6", imagestep.step6[1]);
    formData.append("imagestep6", imagestep.step6[2]);
    formData.append("imagestep6", imagestep.step6[3]);
    formData.append("category", "Món chay");
    formData.append("ingredient", "0.5 kg Sữa chua ăn Dalatmilk");
    formData.append("ingredient", "50 mg Kem tươi ");
    formData.append("ingredient", "240 ml Sữa tươi thanh trùng Dalatmilk");
    formData.append("ingredient", "70 gr Đường");
    formData.append("ingredient", "240 ml Sữa đặc");
    formData.append("ingredient", "200 ml Nước cốt dừa");
    formData.append("ingredient", "5 gr Bột bắp");
    formData.append("ingredient", "3 trái Dâu tươi");
    console.log(formData);
    recipeApi
      .createRecipe(token, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err?.response);
      });
  };

  useEffect(() => {
    console.log(title);
  }, [title]);

  function Ingredient() {
    const [clickPlus, setClickPlus] = useState();
    const [clickMinus, setClickMinus] = useState();
    const [clickDown, setClickDown] = useState();
    const [clickUp, setClickUp] = useState();

    function IngredientItem() {
      return (
        <div className="recipe-ingredient-box">
          <div className="recipe-ingredient__option">
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="recipe-ingredient__option-icon"
              onClick={setClickPlus}
            />
            <FontAwesomeIcon
              icon={faCircleMinus}
              className="recipe-ingredient__option-icon"
              onClick={setClickMinus}
            />
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="recipe-ingredient__option-icon"
              onClick={setClickDown}
            />
            <FontAwesomeIcon
              icon={faCircleChevronUp}
              className="recipe-ingredient__option-icon"
              onClick={setClickUp}
            />
          </div>
          <div className="recipe-ingredient">
            <input
              type="text"
              name="title"
              placeholder="Tên nguyên liệu"
              onChange={setTitle}
              className={"recipe-ingredient__input"}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Số lượng"
              onChange={setTitle}
              className={"recipe-ingredient__input"}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Đơn vị"
              onChange={setTitle}
              className={"recipe-ingredient__input"}
              required
            />
          </div>
        </div>
      )
    }

    const handleClickPlus = () => {
      
    }

    return (
      <div className="recipe-body__section recipe-body__section--ingredient shadow recipe-input-field">
        <h3 className="recipe-body__title">Nguyên liệu</h3>
        <IngredientItem />
      </div>
    );
  }

  return (
    <div className="recipe-page recipe-page--create">
      <div className="container py-3">
        <h2> Đăng công thức mới</h2>
        <div className="recipe-header">
          <div className="recipe-header__left">
            <div
              className="recipe-header__image-box recipe-input-field"
              style={{ backgroundImage: `url(${mainImageUrl})` }}
            >
              <label
                htmlFor="main-image"
                style={{ height: "100%", width: "100%", cursor: "pointer" }}
              />
              <input
                type="file"
                multiple
                onChange={(event) =>
                  handleChangeMainImage(event.target.files, setMainImageUrl)
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
                onChange={setTitle}
                className={
                  "recipe-header__title recipe-input recipe-input--title"
                }
                required
              />
              <textarea
                name="description"
                placeholder="Mô tả món ăn"
                onChange={setShortDescription}
                className={
                  "recipe-header__title recipe-input recipe-input--description"
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
                  onChange={setCookingTime}
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
                  onChange={setamountOfPeople}
                />
                <span>(người)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="recipe-body">
          <Ingredient></Ingredient>
          <div className="recipe-body__section shadow recipe-input-field">
            <div className="recipe-body__step-list">
              <h3 className="recipe-body__title">Cách làm</h3>
              {/* <StepComponent stepList={step} /> */}
            </div>
            <div className="recipe-tag"></div>
          </div>
        </div>
        <p>1</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(1, event.target.files, setImagestep)
          }
        />
        <p>2</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(2, event.target.files, setImagestep)
          }
        />
        <p>3</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(3, event.target.files, setImagestep)
          }
        />
        <p>4</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(4, event.target.files, setImagestep)
          }
        />
        <p>5</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(5, event.target.files, setImagestep)
          }
        />
        <p>6</p>
        <input
          type="file"
          multiple
          onChange={(event) =>
            handleChangeStepImage(6, event.target.files, setImagestep)
          }
        />
      </div>
      <button onClick={handleSubmit}>Gửi</button>
    </div>
  );
};
export default CreateRepice;
