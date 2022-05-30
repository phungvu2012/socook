import React, { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";
import userPageApi from "../../../api/userPageApi";
import { getToken } from "../../../features/sessionStorage";
import { Link } from "react-router-dom";
const Recipe = () => {
  const token = getToken();
  const [data, setData] = useState();

  useEffect(() => {
    adminApi
      .getWaitRecipe(getToken())
      .then((res) => {
        console.log(res?.data);
        if (res?.status === 200) {
          setData(res?.data);
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    // document.addEventListener('DOMContentLoaded', ready)
    // return()
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function ready() {
    if ("IntersectionObserver" in window) {
      let overser = new IntersectionObserver((entries) => {
        console.log(entries);
      });
    }
  }

  const TableComponent = () => {
    console.log(data?.length)
    return (
      <tbody>
      {
        data?.length ?
          data.map((value, index) => {
            return <RowComponent value={value} index={index} key={index} />;
          }) : (
            <tr>
              <td colSpan={5}>Không có sản phẩm nào</td>
            </tr>
          )
        }
      </tbody>
    );
  };

  const RowComponent = ({ value, index }) => {
    const [isLoading, setIsLoading] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isPublish, setIsPublish] = useState();
    const [isDisable, setIsDisable] = useState();
    const [owner, setOwner] = useState();

    useEffect(() => {
      userPageApi
        .getUserInfo(token, value?.user_name)
        .then((response) => {
          console.log(response);
          if (response?.data?.messageCode !== 1) throw { response };
          setOwner(response?.data?.user?.avatar_image);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const handlePublish = (recipeId) => {
      if (isPublish || isDisable) return;
      setIsLoading(true);
      adminApi
        .publishRecipe(getToken(), recipeId)
        .then((res) => {
          console.log(recipeId);
          console.log(res);
          if (res.data.messageCode === 1) {
            setIsDisable(true);
            setIsPublish(true)
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    const deleteRecipe = (recipeId) => {
      if (isDelete || isDisable) return;
      setIsLoading(true);
      adminApi
        .deleteRecipe(getToken(), recipeId)
        .then((res) => {
          console.log(recipeId);
          console.log(res);
          if (res.data.messageCode === 1) {
            setIsDisable(true);
            setIsDelete(true)
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    return (
      <tr key={index} data-index={index} className={isDisable && 'opacity-50'}>
        <td style={{ textTransform: "capitalize" }}>
          {isDisable ? (
            <span className="recipe-link">{value?.title}</span>
          ) : (
            <Link to={`/recipe/${value?.id}`} className='recipe-link'>{value?.title}</Link>
          )
          }
        </td>
        <td style={{ textAlign: "center" }}>{value?.cooking_time}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/user-page/${value?.user_name}`} className="img_group">
            <img src={owner} alt="avatar" />
          </Link>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className={"recipe-button" + (isPublish ? " active" : "")}
            onClick={(event) => handlePublish(value?.id)}
          >
            {isLoading ? (
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
              <React.Fragment>{isPublish ? "Đã Đăng" : "Đăng"}</React.Fragment>
            )}
          </button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "recipe-button recipe-button--delete" + (isDelete ? " active" : "")
            }
            onClick={(event) => deleteRecipe(value?.id)}
          >
            {isLoading ? (
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
              <React.Fragment>{isDelete ? "Đã Xoá" : "Xoá"}</React.Fragment>
            )}
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="recipe-box">
      <div className="recent_project">
        <div className="card_header">
          <h2>Công thức mới</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td>Tên công thức</td>
              <td style={{ textAlign: "center" }}>Thời gian nấu</td>
              <td style={{ textAlign: "center" }}>Số lượng người ăn</td>
              <td style={{ textAlign: "center" }}>Đóng góp</td>
              <td style={{ textAlign: "center" }}>Xoá</td>
              <td style={{ textAlign: "center" }}>Duyệt</td>
            </tr>
          </thead>
          <TableComponent />
        </table>
      </div>
    </div>
  );
};

export default Recipe;
