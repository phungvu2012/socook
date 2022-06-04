import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import adminApi from "../../../api/adminApi";
import recipeApi from "../../../api/recipeApi";
import { getToken } from "../../../features/sessionStorage";

const Main = () => {
  const token = getToken();
  const [urlPage, setUrlPage] = useOutletContext();
  const [newUsers, setNewUsers] = useState();
  const [newRecipe, setNewRecipe] = useState();

  useEffect(() => {
    setUrlPage("");

    adminApi.getUserActive(token).then((res) => {
      console.log(res);
      if (res?.status !== 200) throw { res };
      setNewUsers(res?.data?.data);
    });

    recipeApi
      .top10NewRecipe()
      .then((res) => {
        if (res?.status !== 200) throw { res };
        console.log(res);
        setNewRecipe(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                <td>Lượt xem</td>
                <td>Yêu thích</td>
                <td>Đóng góp</td>
              </tr>
            </thead>
            <tbody>
              {newRecipe &&
                newRecipe.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link to={`/recipe/${value?.id}`}>{value?.title}</Link>
                      </td>
                      <td>{value?.total_views}</td>
                      <td style={{ textAlign: "center" }}>
                        <span>{value?.total_likes}</span>
                      </td>
                      <td>
                        <Link
                          to={`/user-page/${value?.owner_id}`}
                          className="img_group"
                        >
                          {value?.user_name}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              {/* <tr>
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
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div className="recent_customers">
          <div className="card_header">
            <h2>Khách hàng mới</h2>
          </div>
          <table>
            <tbody>
              {newUsers &&
                newUsers.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="info_img">
                          <img src={value?.avatar_image} />
                        </div>
                      </td>
                      <td>
                        <h4>{value?.full_name}</h4>
                        <span>Nơi sống: {value?.city}</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
