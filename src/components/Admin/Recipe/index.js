import React, { useEffect, useState } from "react";
import adminApi from "../../../api/adminApi";
import { getToken } from "../../../features/sessionStorage";
const Recipe = () => {
  const [data, setData] = useState();
  // const [loading, setLoading] = useState();
  // const [success, setSuccess] = useState();

  useEffect(() => {
    adminApi
      .getWaitRecipe(getToken())
      .then((res) => {
        // console.log(res);
        if (res?.status === 200) {
          setData(res?.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="recipe-box">
      <div className="recent_project">
        <div className="card_header">
          <h2>Công thức mới</h2>
        </div>
        <table>
          <thead>
            <tr>
              <td>Tên công thức</td>
              <td style={{textAlign: 'center'}}>Thời gian nấu</td>
              <td style={{textAlign: 'center'}}>Số lượng người ăn</td>
              <td style={{textAlign: 'center'}}>Đóng góp</td>
              <td style={{textAlign: 'center'}}>Duyệt</td>
            </tr>
          </thead>
          <tbody>
            {data?.length &&
              data.map((value, index) => {
                const handlePublish = (recipeId, event) => {
                  adminApi.publishRecipe(getToken(), recipeId)
                  .then(res => {
                    console.log(recipeId)
                    console.log(res);
                    if(res.data.messageCode === 1) {
                      const tr = document.querySelectorAll("tr[data-index]");
                      for(let i = 0; i < tr.length; ++i) {
                        if(tr[i].getAttribute('data-index') == index) {
                          tr[i].style.display = 'none';
                          break;
                        }
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
                }
                return (
                  <tr key={index} data-index={index}>
                    <td style={{textTransform: 'capitalize'}}>
                      <a href={`/recipe/${value?.id}`}>{value?.title}</a>
                    </td>
                    <td style={{textAlign: 'center'}}>{value?.cooking_time}</td>
                    <td style={{textAlign: 'center'}}>
                      {value?.amount_of_people}
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <span className="img_group">
                        <img
                          src="https://social-cook.s3.ap-southeast-1.amazonaws.com/1652323370912?AWSAccessKeyId=AKIA6GWDGFJCSSAIQEXH&Expires=1652417494&Signature=Gyeq9Yi1lvE%2FUgif35KIvliml3s%3D"
                          alt=""
                        />
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                    <button
                      className="recipe-button"
                       onClick={(event) => handlePublish(value?.id, event)}
                    >
                      Đăng
                    </button>
                    </td>  
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recipe;
