import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import adminApi from "../../../api/adminApi";
import { getToken } from "../../../features/sessionStorage";


const ReportRecipe = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();
  
  useEffect(() => {
    setUrlPage('reportRecipe');

    adminApi.getReportRecipe(token)
    .then(response => {
      console.log(response);
      if(response?.status !== 200) throw {response};
      setData(response?.data);

    })
  }, [])

  const TableComponent = ({data}) => {
    if(!Array.isArray(data)) return ;
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
        <td style={{ textAlign: "center" }}>{value?.recipeId}</td>
        <td style={{ textAlign: "center" }}>{value?.userId}</td>
        <td style={{ textAlign: "center" }}>{value?.content}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
      </tr>
    )
  }

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
              <td style={{ textAlign: "center" }}>Ban user</td>
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
