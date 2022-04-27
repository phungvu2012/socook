import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import { getToken, isActive } from "../../../features/sessionStorage";
import auth from "../../../api/auth";
import "./../../GlobalStyles/_animation.scss";

const ActiveEmail = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  function ModalActive({ children }) {
    const handleClose = () => setShow(false);
    return (
      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="rounded-3rem"
      >
        <Modal.Header closeButton className="pe-4"></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    );
  }

  function Content(props) {
    const timeCountdown = 60;

    const [countdown, setCountdown] = useState(0);
    const [validClick, setValidClick] = useState(true);
    const [messErr, setMessErr] = useState("");
    var countdownId;

    useEffect(() => {
      console.log("active", isActive());
      if (isActive()) {
        navigate("/");
      }
    }, [validClick]);

    useEffect(() => {
      if (countdown === 0) {
        setValidClick(true);
        return;
      }

      countdownId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(countdownId);
    }, [countdown]);

    const handleClick = () => {
      if (validClick && !isActive()) {
        setValidClick(false);
        setCountdown(timeCountdown);
        setMessErr("");

        // console.log("token", token);
        if (token) {
          auth
            .resendActiveEmail(token)
            .then((response) => {
              console.log(response);
              if (response.data.messageCode !== 1) throw { response };
            })
            .catch((err) => {
              if (!err?.response) {
                setMessErr("Server không phản hồi");
              } else setMessErr("Đang có lỗi vui lòng thử lại sau!");
            });
        }
      }
    };

    return (
      <div className="d-flex flex-column align-items-center">
        <h3> Tài khoản chưa được kích hoạt </h3>
        <p> Vui lòng kiểm tra gmail để kích hoạt tài khoản </p>
        <p className="form-auth__text-gray pb-3 text-center">
          Nếu chưa nhận được email kích hoạt. <br />
          <span
            className={"textlink-blue" + (validClick ? "" : "text-muted")}
            onClick={handleClick}
          >
            {countdown ? `Đã gửi lại Email (${countdown}s)` : "Gửi lại Email."}
          </span>
        </p>
        {messErr && <p className="text-danger m-0"> {messErr} </p>}
        <p className="form-auth__text-gray p-3 m-0 text-center">
          Chuyển đến <Link to="/"> trang chủ </Link>
        </p>
      </div>
    );
  }

  return (
    <ModalActive>
      <Content countdown="hello"></Content>
    </ModalActive>
  );
};

export default ActiveEmail;
