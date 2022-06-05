import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { getToken } from "../../../features/sessionStorage";
import adminApi from "../../../api/adminApi";
import recipeApi from "../../../api/recipeApi";

const ReportComment = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();

  useEffect(() => {
    adminApi.getReportComment(token).then((response) => {
      if (response?.status !== 200) throw { response };
      console.log(response);
      setData(response?.data);
    });
    setUrlPage("reportComment");
  }, []);

  const TableComponent = ({ data }) => {
    if (!Array.isArray(data)) return;
    console.log(data);
    return (
      <tbody>
        {data.map((value, index) => {
          return <RowComponent value={value} stt={index} key={index} />;
        })}
      </tbody>
    );
  };

  const RowComponent = ({ value, stt }) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isDisable, setIsDisable] = useState();
    const [isLoadingResponse, setIsLoadingResponse] = useState();
    const [isResponse, setIsResponse] = useState();

    const handleResponseReport = (reportId) => {
      const responseReport =
        "Chúng tôi đã ghi nhận báo cáo của bạn. Chân thành cảm ơn nỗ lực xây dựng cộng đồng Socook để ngày càng tốt hơn của bạn.";
      if (isResponse) return;
      setIsLoadingResponse(true);
      // if(window.confirm(`Bạn có muốn xoá ${userId?.}`))
      adminApi
        .responseReportComment(token, reportId, responseReport)
        .then((response) => {
          if (response?.status !== 200) throw { response };
          console.log(response);
          setIsResponse(true);
          setIsDisable(true);
          setIsLoadingResponse(false);
        })
        .catch((err) => {
          alert(`Phản hồi: ${reportId}
        Vui lòng thử lại sau!`);
          setIsLoadingResponse(false);
        });
    };

    const deleteComment = (reportId) => {
      if (isDisable) return;
      setIsLoadingDelete(true);
      recipeApi
        .deleteComment(token, reportId)
        .then((response) => {
          console.log(response);
          if (response?.status !== 200) throw { response };
          setIsDelete(true);
          setIsDisable(true);
          setIsLoadingDelete(false);
        })
        .catch((err) => {
          console.log(err);
          setIsDelete(false);
          setIsLoadingDelete(false);
        });
    };

    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt + 1}</td>
        <td style={{ textAlign: "center" }}>
          <HashLink to={`/recipe/${value?.recipeId}#recipe-comment`}>
            {value?.commentContent}
          </HashLink>
        </td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/user-page/${value?.userId}`}>{value?.userId}</Link>
        </td>
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--warning" +
              (isDisable ? " active" : "")
            }
            onClick={(event) => handleResponseReport(value?.id)}
          >
            {isLoadingResponse ? (
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
                {isResponse ? "Đã Phản hồi" : "Phản hồi"}
              </React.Fragment>
            )}
          </button>
        </td>
        {/* <td style={{ textAlign: "center" }}>{value?.response}</td> */}
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--delete" +
              (isDisable ? " active" : "")
            }
            onClick={(event) => deleteComment(value?.commentId)}
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
          <h2>Báo cáo bình luận</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>STT</td>
              <td style={{ textAlign: "center" }}>Nội dung comment</td>
              <td style={{ textAlign: "center" }}>Nội dung báo cáo</td>
              <td style={{ textAlign: "center" }}>Người báo cáo</td>
              <td style={{ textAlign: "center" }}>Phản hồi báo cáo</td>
              <td style={{ textAlign: "center" }}>Xoá comment</td>
            </tr>
          </thead>
          <TableComponent data={data} />
        </table>
      </div>
    </div>
  );
};

export default ReportComment;
