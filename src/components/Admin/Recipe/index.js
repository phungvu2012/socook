import React, { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";
import userPageApi from "../../../api/userPageApi";
import { getToken } from "../../../features/sessionStorage";
import { Link, useOutletContext } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./../main.scss";

const Recipe = ({ parentCallback, index }) => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();

  useEffect(() => {
    setUrlPage("recipe");

    adminApi
      .getWaitRecipe(token)
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
    console.log(data?.length);
    return (
      <tbody>
        {data?.length ? (
          data.map((value, index) => {
            return <RowComponent value={value} index={index} key={index} />;
          })
        ) : (
          <tr>
            <td colSpan={5}>Không có sản phẩm nào</td>
          </tr>
        )}
      </tbody>
    );
  };

  const RowComponent = ({ value, index }) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState();
    const [isLoadingPublish, setIsLoadingPublish] = useState();
    const [isLoadingReject, setIsLoadingReject] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isPublish, setIsPublish] = useState();
    const [isReject, setIsReject] = useState();
    const [isDisable, setIsDisable] = useState();
    const [owner, setOwner] = useState();
    const [show, setShow] = useState();
    let feedback = '';

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

    useEffect(() => {
      console.log(feedback);
    });

    const handlePublish = (recipeId) => {
      if (isPublish || isDisable) return;
      setIsLoadingPublish(true);
      adminApi
        .publishRecipe(getToken(), recipeId)
        .then((res) => {
          console.log(recipeId);
          console.log(res);
          if (res.data.messageCode === 1) {
            setIsDisable(true);
            setIsPublish(true);
          }
          setIsLoadingPublish(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingPublish(false);
        });
    };

    const handleReject = (recipeId, reason) => {
      if (isReject || isDisable) return;
      setIsLoadingReject(true);
      adminApi
        .rejectRecipe(getToken(), recipeId, reason)
        .then((res) => {
          console.log(res);
          if (res.data.messageCode === 1) {
            setIsDisable(true);
            setIsReject(true);
          }
          setIsLoadingReject(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingReject(false);
          setIsReject(false);
        });
    };

    const deleteRecipe = (recipeId) => {
      if (isDelete || isDisable) return;
      setIsLoadingDelete(true);
      if (!confirm("Bạn có muốn xoá công thức: " + value?.title)) {
        setIsLoadingDelete(false);
        return;
      }
      adminApi
        .deleteRecipe(getToken(), recipeId)
        .then((res) => {
          console.log(recipeId);
          console.log(res);
          if (res.data.messageCode === 1) {
            setIsDisable(true);
            setIsDelete(true);
          }
          setIsLoadingDelete(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingDelete(false);
        });
    };

    function ModalActive({ children, title }) {
      const handleClose = () => setShow(false);
      return (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          dialogClassName="rounded-3rem mw-100"
          animation={false}
        >
          <Modal.Header closeButton className="pe-4">
            <h5 className="text-center flex-grow-1 m-0">
              <span className="text-info fw-bolder"> Demo: </span>{" "}
              {`  ${title}`}
            </h5>
          </Modal.Header>
          <Modal.Body className="shadow">{children}</Modal.Body>
        </Modal>
      );
    }

    const RejectComponent = () => {
      const [input, setInput] = useState(feedback);

      useEffect(() => {
        feedback = input;
      })

      return (
        <div className="recipe-feedback">
          <h3>Góp ý</h3>
          { !isReject && (
            <textarea
              placeholder="Điền góp ý hoặc lý do từ chối?"
              className='recipe-feedback__input'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            ></textarea>
          )
          }
          <div className="d-flex justify-content-evenly flex-wrap flex-column">
            <button
              className={
                "recipe-button recipe-button--warning" +
                (isDisable ? " active" : "")
              }
              onClick={(event) => handleReject(value?.id, feedback)}
            >
              {isLoadingReject ? (
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
                <React.Fragment>
                  {isReject ? "Đã từ chôi" : "Từ chối"}
                </React.Fragment>
              )}
            </button>
            <button
              className={
                "recipe-button recipe-button--delete" +
                (isDisable ? " active" : "")
              }
              onClick={(event) => deleteRecipe(value?.id)}
            >
              {isLoadingDelete ? (
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
            <button
              className={
                "recipe-button recipe-button--publish" +
                (isDisable ? " active" : "")
              }
              onClick={(event) => handlePublish(value?.id)}
            >
              {isLoadingPublish ? (
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
                <React.Fragment>
                  {isPublish ? "Đã Đăng" : "Đăng"}
                </React.Fragment>
              )}
            </button>
          </div>
        </div>
      );
    };

    return (
      <tr key={index} data-index={index} className={isDisable && "opacity-50"}>
        <td style={{ textTransform: "capitalize" }}>
          {isDisable ? (
            <span className="section-link">{value?.title}</span>
          ) : (
            <Link to={`/recipe/${value?.id}`} className="section-link">
              {value?.title}
            </Link>
          )}
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
            className={
              "section-button section-button--info" +
              (isPublish ? " active" : "")
            }
            onClick={(event) => setShow(!show)}
          >
            Demo
          </button>
          <ModalActive title={value?.title}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-8 col-lg-9 col-xl-10">
                  <iframe
                    src={`/recipe/${value?.id}`}
                    title="công thức"
                    style={{ width: "100%", height: "85vh" }}
                  ></iframe>
                </div>
                <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                  <RejectComponent />
                </div>
              </div>
            </div>
          </ModalActive>
        </td>
        <td style={{ textAlign: "center" }}>
          <Link
            className={"section-button" + (isPublish ? " active" : "")}
            to={`/update-recipe/${value?.id}`}
          >
            Sửa
          </Link>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--publish" +
              (isPublish ? " active" : "")
            }
            onClick={(event) => handlePublish(value?.id)}
          >
            {isLoadingPublish ? (
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
              "section-button section-button--delete" +
              (isDelete ? " active" : "")
            }
            onClick={(event) => deleteRecipe(value?.id)}
          >
            {isLoadingDelete ? (
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
    <div className="section-box">
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
              <td style={{ textAlign: "center" }}>Demo</td>
              <td style={{ textAlign: "center" }}>Sửa</td>
              <td style={{ textAlign: "center" }}>Duyệt</td>
              <td style={{ textAlign: "center" }}>Xoá</td>
            </tr>
          </thead>
          <TableComponent />
        </table>
      </div>
    </div>
  );
};

export default Recipe;
