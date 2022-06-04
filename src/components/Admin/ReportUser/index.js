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
    const [isDisable, setIsDisable] = useState();
    const [isLoadingDelete, setIsLoadingDelete] = useState();
    const [isDelete, setIsDelete] = useState();
    const [isLoadingResponse, setIsLoadingResponse] = useState();
    const [isResponse, setIsResponse] = useState();

    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt + 1}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/user-page/`}>{value?.reportUserId}</Link>
        </td>
        <td style={{ textAlign: "center" }}>{value?.reportedUserId}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
        <td style={{ textAlign: "center" }}>
          <button className="section-button section-button--delete">Xoá</button>
        </td>
        <td style={{ textAlign: "center" }}>
          <button className="section-button section-button--warning">
            Xoá
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
              <td style={{ textAlign: "center" }}>Xoá báo cáo</td>
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
