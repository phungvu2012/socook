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
    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>{value?.userId}</td>
        <td style={{ textAlign: "center" }}>{value?.response}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
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
              <td style={{ textAlign: "center" }}>Duyệt</td>
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
