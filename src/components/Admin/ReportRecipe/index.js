import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import adminApi from "../../../api/adminApi";
import userPageApi from "../../../api/userPageApi";
import { getToken } from "../../../features/sessionStorage";
import { Modal } from "react-bootstrap";

const ReportRecipe = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();

  useEffect(() => {
    setUrlPage("reportRecipe");

    adminApi.getReportRecipe(token).then((response) => {
      console.log(response);
      if (response?.status !== 200) throw { response };
      setData(response?.data);
    });
  }, []);

  const TableComponent = ({ data }) => {
    if (!Array.isArray(data)) return;
    return (
      <tbody>
        {data ? (
          data.map((value, index) => {
            return <RowComponent value={value} stt={index} key={index} />;
          })
        ) : (
          <tr>
            <td colSpan={5}>Không có báo cáo về công thức nào!</td>
          </tr>
        )}
      </tbody>
    );
  };

  const RowComponent = ({ value, stt }) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isDisable, setIsDisable] = useState();
    const [owner, setOwner] = useState();
    const [show, setShow] = useState();

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

    const deleteRecipe = (recipeId) => {
      if (isDelete || isDisable) return;
      setIsLoadingDelete(true);
      if (!window.confirm("Bạn có muốn xoá công thức: " + value?.title)) {
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
      return (
        <div className="recipe-feedback">
          <div className="d-flex justify-content-evenly flex-wrap flex-column">
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
          </div>
        </div>
      );
    };

    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt}</td>
        <td style={{ textAlign: "center" }}>{value?.recipeId}</td>
        <td style={{ textAlign: "center" }}>{value?.userId}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>
          <button
            className={"section-button section-button--info"}
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
        <td style={{ textAlign: 'center'}}>
          <button
            className={
              "section-button section-button--warning" +
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
              <React.Fragment>{isDelete ? "Đã Khoá" : "Khoá"}</React.Fragment>
            )}
          </button>
        </td>
        <td style={{ textAlign: 'center'}}>
          <button
            className={
              "section-button section-button--delete" +
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
        </td>
      </tr>
    );
  };

  return (
    <div className="section-box">
      <div className="recent_project">
        <div className="card_header">
          <h2>Báo cáo công thức</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>STT</td>
              <td style={{ textAlign: "center" }}>Tên công thức</td>
              <td style={{ textAlign: "center" }}>Người báo cáo</td>
              <td style={{ textAlign: "center" }}>Nội dung báo cáo</td>
              <td style={{ textAlign: "center" }}>Demo</td>
              <td style={{ textAlign: "center" }}>Khoá tài khoản</td>
              <td style={{ textAlign: "center" }}>Xoá công thức</td>
            </tr>
          </thead>
          <TableComponent data={data} />
        </table>
      </div>
    </div>
  );
};

export default ReportRecipe;
