import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getToken } from "../../../features/sessionStorage";
import adminApi from "../../../api/adminApi";

const ReportUser = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();

  useEffect(() => {
    adminApi.getReportUser(token).then((response) => {
      if (response?.status !== 200) throw { response };
      console.log(response);
      setData(response?.data);
    });
    setUrlPage("reportUser");
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
    const [isLoadingBanUser, setIsLoadingBanUser] = useState();
    const [isBanUser, setIsBanUser] = useState(value?.status === 2);
    const [isLoadingResponse, setIsLoadingResponse] = useState();
    const [isResponse, setIsResponse] = useState();

    const handleResponseReport = (reportId) => {
      const responseReport =
        "Chúng tôi đã ghi nhận báo cáo của bạn. Chân thành cảm ơn nỗ lực xây dựng cộng đồng Socook để ngày càng tốt hơn của bạn.";
      if (isResponse) return;
      setIsLoadingResponse(true);
      // if(window.confirm(`Bạn có muốn xoá ${userId?.}`))
      adminApi
        .responseReportUser(token, reportId, responseReport)
        .then((response) => {
          if (response?.status !== 200) throw { response };
          console.log(response);
          setIsResponse(true);
          setIsLoadingResponse(false);
        })
        .catch((err) => {
          alert(`Phản hồi: ${reportId}
        Vui lòng thử lại sau!`);
          setIsLoadingResponse(false);
        });
    };

    const handleBanUser = (userId) => {
      if (isBanUser) return;
      setIsLoadingBanUser(true);
      
      adminApi
        .banUser(token, userId)
        .then((response) => {
          if (response?.status !== 200) throw { response };
          console.log(response);
          setIsBanUser(true);
          setIsLoadingBanUser(false);
        })
        .catch((err) => {
          alert(`Không thể khoá: ${value?.userId}
          Vui lòng thử lại sau!`);
          setIsLoadingBanUser(false);
        });
    };

    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt + 1}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/user-page/`}>{value?.reportUserId}</Link>
        </td>
        <td style={{ textAlign: "center" }}>{value?.reportedUserId}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--warning" +
              (isResponse ? " active" : "")
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
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--delete" +
              (isBanUser ? " active" : "")
            }
            onClick={(event) => handleBanUser(value?.reportUserId)}
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
    );
  };

  return (
    <div className="section-box">
      <div className="recent_project">
        <div className="card_header">
          <h2>Báo cáo người dùng</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td style={{ textAlign: "center" }}>STT</td>
              <td>Người bị báo cáo</td>
              <td style={{ textAlign: "center" }}>Người báo cáo</td>
              <td style={{ textAlign: "center" }}>Nội dung báo cáo</td>
              <td style={{ textAlign: "center" }}>Phản hồi</td>
              <td style={{ textAlign: "center" }}>Khoá người dùng</td>
            </tr>
          </thead>
          <TableComponent data={data} />
        </table>
      </div>
    </div>
  );
};

export default ReportUser;
