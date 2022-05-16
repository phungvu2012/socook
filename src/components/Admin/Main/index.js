import React from "react";

const Main = () => {
  return (
    <React.Fragment>
      {/* <!-- End Top Bar --> */}
      <div className="card-boxes">
        <div className="box">
          <div className="right_side">
            <div className="numbers">200</div>
            <div className="box_topic">Khách hàng</div>
          </div>
          <i className="bx bxs-user"></i>
        </div>
        <div className="box">
          <div className="right_side">
            <div className="numbers">300</div>
            <div className="box_topic">Công thức</div>
          </div>
          <i className="bx bxs-cookie"></i>
        </div>
        <div className="box">
          <div className="right_side">
            <div className="numbers">20</div>
            <div className="box_topic">Báo cáo</div>
          </div>
          <i className="bx bxs-report"></i>
        </div>
        <div className="box">
          <div className="right_side">
            <div className="numbers">?</div>
            <div className="box_topic">Đã nấu</div>
          </div>
          <i className="bx bxs-cart-download"></i>
        </div>
      </div>
      {/* <!-- End Card Boxs --> */}
      <div className="details">
        <div className="recent_project">
          <div className="card_header">
            <h2>Công thức mới</h2>
          </div>
          <table>
            <thead>
              <tr>
                <td>Tên công thức</td>
                <td>Thời gian nấu</td>
                <td>Độ khó</td>
                <td>Đóng góp</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trứng luộc</td>
                <td>20</td>
                <td>
                  <span className="badge bg_worning">Vừa</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-3.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-4.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+5</span>
                    </span> */}
                </td>
              </tr>
              <tr>
                <td>Trà sữa trân châu</td>
                <td>90</td>
                <td>
                  <span className="badge bg_danger">Cao</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652273267824?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417048&Signature=6EgCmxKC8vYdXAZJRLDfs8Qeeyg%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-2.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-3.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+5</span>
                    </span> */}
                </td>
              </tr>
              <tr>
                <td>Rau luộc</td>
                <td>20</td>
                <td>
                  <span className="badge bg_info">Thấp</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-5.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-2.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+1</span>
                    </span> */}
                </td>
              </tr>
              <tr>
                <td>Sữa chua đánh đá</td>
                <td>40</td>
                <td>
                  <span className="badge bg_worning">Vừa</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-4.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-5.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+5</span>
                    </span> */}
                </td>
              </tr>
              <tr>
                <td>Thịt bò xào rau cần</td>
                <td>108</td>
                <td>
                  <span className="badge bg_danger">Cao</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652330936206?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417340&Signature=ugjurHa7dj3suqWTHIK5QuiP6qs%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-3.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-4.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+5</span>
                    </span> */}
                </td>
              </tr>
              <tr>
                <td>Rau muống xào</td>
                <td>30</td>
                <td>
                  <span className="badge bg_info">Thấp</span>
                </td>
                <td>
                  <span className="img_group">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652330936206?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417340&Signature=ugjurHa7dj3suqWTHIK5QuiP6qs%3D"
                      alt=""
                    />
                  </span>
                  {/* <span className="img_group">
                      <img src="img/avatar-2.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <img src="img/avatar-3.jpg" alt="" />
                    </span>
                    <span className="img_group">
                      <span className="initial">+1</span>
                    </span> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recent_customers">
          <div className="card_header">
            <h2>Khách hàng mới</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652273267824?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417048&Signature=6EgCmxKC8vYdXAZJRLDfs8Qeeyg%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Vũ Minh Phụng</h4>
                  <span>phungvuminh2000@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Đào Đình Nghĩa</h4>
                  <span>inoriyuzurihamw@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652243940020?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652416962&Signature=W1cBsdMtYVXrWcSXIT3NBZVaavg%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Đặng Xuân Ngọc</h4>
                  <span>18020960@vnu.edu.vn</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652330929322?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417330&Signature=Ks4qWdXygHPb9NRghQwi7a7EOjM%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Phụng Vũ</h4>
                  <span>phungvuminh2000@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Nguyễn Ngọc Sơn</h4>
                  <span>badboy20324@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="info_img">
                    <img
                      src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652330936206?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417340&Signature=ugjurHa7dj3suqWTHIK5QuiP6qs%3D"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <h4>Nguyễn Minh Sáng</h4>
                  <span>sangnguyenminh2000@gmail.com</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
