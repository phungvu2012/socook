import "./ReportInput.scss";
import recipeApi from "../../api/recipeApi";
import userApi from "../../api/userApi";
import { getToken } from "../../features/sessionStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportInput({ idReport, typeReport, resetIdDelete }) {
  const token = getToken();
  const navigate = useNavigate();
  const [reportMessage, setReportMessage] = useState("");
  function mapTypeReport(typeReport) {
    switch (typeReport) {
      case "recipe":
        return "công thức";
      case "comment":
        return "bình luận";
      case "user": 
        return "người dùng"
      default:
        return "";
    }
  }

  const handleCancelReport = (e) => {
    e.preventDefault();
    resetIdDelete(0);
  };

  const handleConfirmReport = (e) => {
    e.preventDefault();

    if (token) {
      const reportObj = {
        recipeId: parseInt(idReport),
        content: reportMessage,
      };
      if (typeReport === "recipe") {
        recipeApi
          .reportRecipe(token, reportObj)
          .then((res) => {
            console.log(res);
            resetIdDelete(0);
          })
          .catch((err) => console.log(err));
      }
      if (typeReport === "comment") {
        const reportObj = {
          commentId: parseInt(idReport),
          content: reportMessage,
        };
        recipeApi
          .reportComment(token, reportObj)
          .then((res) => {
            console.log(res);
            resetIdDelete(0);
          })
          .catch((err) => console.log(err));
      }

      if (typeReport === "user") {
        const reportObj = {
          reportedUserId: parseInt(idReport),
          content: reportMessage,
        };
        userApi
          .reportUser(token, reportObj)
          .then((res) => {
            console.log(res);
            resetIdDelete(0);
          })
          .catch((err) => console.log(err));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="report-input-container">
      <div className="report-input-overlay"></div>
      <div className="report-input-wrapper">
        <p>Vui lòng nhập lý do báo cáo {mapTypeReport(typeReport)} này</p>
        <textarea
          rows="4"
          className="report-input-textarea"
          value={reportMessage}
          onChange={(e) => setReportMessage(e.target.value)}
          placeholder="Nhập lý do báo cáo..."
          autoFocus
        ></textarea>
        <div className="report-button-wrapper">
          <button className="report-button-cancel" onClick={handleCancelReport}>
            Hủy
          </button>
          <button
            className="report-button-confirm"
            onClick={handleConfirmReport}
          >
            Báo cáo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportInput;
