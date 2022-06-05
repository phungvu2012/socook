import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getToken } from "../../../features/sessionStorage";
import adminApi from "../../../api/adminApi";

const ReportComment = () => {
  const token = getToken();
  const [data, setData] = useState();
  const [urlPage, setUrlPage] = useOutletContext();
  const [textSearch, setTextSearch] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    setUrlPage("profile");
    adminApi
      .searchUser(token, '')
      .then((response) => {
        console.log(response);
        if (response?.status !== 200) throw { response };
        setLoading(false);
        setData(response?.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(textSearch);
  }, [textSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    adminApi
      .searchUser(token, textSearch)
      .then((response) => {
        console.log(response);
        if (response?.status !== 200) throw { response };
        setLoading(false);
        setData(response?.data);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

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
    
    const [isLoadingUnlockUser, setIsLoadingUnlockUser] = useState();
    const [isUnlockUser, setIsUnlockUser] = useState(value?.status === 1);
    
    const handleBanUser = (userId) => {
      if (isBanUser) return;
      setIsLoadingBanUser(true);
      
      adminApi
        .banUser(token, userId)
        .then((response) => {
          if (response?.status !== 200) throw { response };
          console.log(response);
          setIsBanUser(true);
          setIsUnlockUser(false);
          setIsLoadingBanUser(false);
        })
        .catch((err) => {
          alert(`Không thể khoá: ${value?.userId}
          Vui lòng thử lại sau!`);
          setIsLoadingBanUser(false);
        });
    };
    
    const handleUnlockUser = (userId) => {
      if (isUnlockUser) return;
      setIsLoadingUnlockUser(true);
      
      adminApi
        .unlockUser(token, userId)
        .then((response) => {
          if (response?.status !== 200) throw { response };
          console.log(response);
          setIsUnlockUser(true);
          setIsBanUser(false);
          setIsLoadingUnlockUser(false);
        })
        .catch((err) => {
          alert(`Không thể khoá: ${value?.userId}
          Vui lòng thử lại sau!`);
          setIsLoadingUnlockUser(false);
        });
    };
    return (
      <tr key={stt}>
        <td style={{ textAlign: "center" }}>{stt}</td>
        <td style={{ textAlign: "center" }}>
          <Link to={`/user-page/${value?.userName}`}>
          {value?.userName}
          </Link>
          </td>
        <td style={{ textAlign: "center" }}>{value?.fullName}</td>
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--delete" +
              (isBanUser ? " active" : "")
            }
            onClick={(event) => handleBanUser(value?.id)}
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
        <td style={{ textAlign: "center" }}>
          <button
            className={
              "section-button section-button--publish" +
              (isUnlockUser ? " active" : "")
            }
            onClick={(event) => handleUnlockUser(value?.id)}
          >
            {isLoadingUnlockUser ? (
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
              <React.Fragment>{isUnlockUser ? "Đã Mở Khoá" : "Mở Khoá"}</React.Fragment>
            )}
          </button>
        </td>
        {/* <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td> */}
        {/* <td style={{ textAlign: "center" }}>{value?.amount_of_people}</td> */}
      </tr>
    );
  };

  return (
    <React.Fragment>
      <div className="user_section section-box justify-content-start">
        <form onSubmit={handleSubmit}>
          <div className="search_wrapper">
            <label>
              <span>
                <i className="bx bx-search"></i>
              </span>
              <input
                type="search"
                placeholder="Search..."
                value={textSearch}
                onChange={(event) => setTextSearch(event.target.value)}
                autoFocus
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn-primary px-4 py-2 rounded-pill mx-3 mt-3 border-light shadow text-white"
            onClick={(event) => setLoading(true)}
          >
            {loading ? "Loading..." : "Tìm kiếm"}
          </button>
        </form>
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
                <td style={{ textAlign: "center" }}>Khoá người dùng </td>
                <td style={{ textAlign: "center" }}>Mở khoá người dùng </td>
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
