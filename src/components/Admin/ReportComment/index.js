import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getToken } from "../../../features/sessionStorage";
import adminApi from "../../../api/adminApi";

const ReportComment = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();
  

  useEffect(() => {
    adminApi.getReportComment(token)
    .then(response => {
      if(response?.status !== 200) throw {response};
      console.log(response);
      setData(response?.data)
    })
    setUrlPage("reportComment");
  }, []);

  const TableComponent = ({data}) => {
    if(!Array.isArray(data)) return ;
    console.log(data)
    return (
      <tbody>
        {
          data.map((value, index) => {
            return <RowComponent value={value} stt={index} key={index}/>
          })
        }
      </tbody>
    )
  }

  const RowComponent = ({value, stt}) => {
    const [isLoadingDelete, setIsLoadingDelete] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isDisable, setIsDisable] = useState();
    const [isLoadingBanUser] = useState();
    const [isBanUser, setIsBanUser] = useState();

    const handleBanUser = (userId) => {
      if(isBanUser) return;
      isLoadingBanUser(true);

      adminApi.banUser(token, userId)
      .then(response => {
        if(response?.status !== 200) throw {response} 
        console.log(response);
        setIsBanUser(true);
        isLoadingBanUser(false);
      })
      .catch(err => {
        alert(`Không thể khoá: ${value?.userId}
        Vui lòng thử lại sau!`)
        isLoadingBanUser(false);
      })
    }

    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>{value?.userId}</td>
        <td style={{ textAlign: "center" }}>{value?.response}</td>
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
        <td style={{ textAlign: 'center'}}>
          <button
            className={
              "section-button section-button--warning" +
              (isBanUser ? " active" : "")
            }
            onClick={(event) => handleBanUser(value?.userId)}
          >
            {isLoadingBanUser ? (
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
              <React.Fragment>{isBanUser ? "Đã Khoá" : "Khoá"}</React.Fragment>
            )}
          </button>
        </td>
      </tr>
    )
  }

  return (
    <div className="section-box">
      <div className="recent_project">
        <div className="card_header">
          <h2>Báo cáo bình luận</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>Số thứ tự</td>
              <td style={{ textAlign: "center" }}>Nội dung</td>
              <td style={{ textAlign: "center" }}>Người báo cáo</td>
              <td style={{ textAlign: "center" }}>Phản hồi</td>
              <td style={{ textAlign: "center" }}>Xoá</td>
              <td style={{ textAlign: "center" }}>Khoá người dùng </td>
            </tr>
          </thead>
          <TableComponent data={data} />
        </table>
      </div>
    </div>
  );
};

export default ReportComment;
