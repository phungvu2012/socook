import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getToken } from "../../../features/sessionStorage";
import adminApi from "../../../api/adminApi";

const ReportComment = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();
  const [textSearch, setTextSearch] = useState('');

  useEffect(() => {
    setUrlPage("profile");
  }, []);

  useEffect(() => {
    console.log(textSearch)
  }, [textSearch])

  const handleSubmit = () => {
    adminApi.searchUser(token, textSearch)
    .then(response => {
      console.log(response)
      if(response?.status !== 200) throw { response }
      setData(response?.data)
    })
  }

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
    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt}</td>
        <td style={{ textAlign: "center" }}>{value?.userName}</td>
        <td style={{ textAlign: "center" }}>{value?.userId}</td>
        <td style={{ textAlign: "center" }}>{value?.response}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
        <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <div className="user_section section-box justify-content-start">
        <div className="search_wrapper">
          <label>
            <span>
              <i className="bx bx-search"></i>
            </span>
            <input type="search" placeholder="Search..." value={textSearch} onChange={event => setTextSearch(event.target.value)} autoFocus/>
          </label>
        </div>
        <input type="submit" className="btn-primary px-4 py-2 rounded-pill mx-3 border-light shadow" onClick={handleSubmit}/>
      </div>
      <div className="section-box">
        <div className="recent_project">
          <div className="card_header">
            <h2>Báo cáo bình luận</h2>
          </div>
          <table>
            <thead>
              <tr>
                <td style={{ textAlign: "center" }}>Số thứ tự</td>
                <td style={{ textAlign: "center" }}>UserName</td>
                <td style={{ textAlign: "center" }}>Tên người dùng</td>
                {/* <td style={{ textAlign: "center" }}>Quê Quán</td> */}
                {/* <td style={{ textAlign: "center" }}></td> */}
                <td style={{ textAlign: "center" }}>Khoá người dùng </td>
              </tr>
            </thead>
            <TableComponent data={data} />
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReportComment;
