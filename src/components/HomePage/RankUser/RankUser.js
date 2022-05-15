import "../RankRecipe/RankRecipe.scss";
import './RankUser.scss'
import { useEffect, useState } from "react";
import { memo } from "react";
import homePage from "../../../api/homePageApi";
import { Link } from "react-router-dom";

const RankUser = memo(() => {
  // function RankRecipe() {
    const [rankUser, setRankUser] = useState([]);
  
    useEffect(() => {
      homePage
        .getTopUserDependTotalRecipe()
        .then((res) => {
          setRankUser([...res.data.data]);
        })
        .catch((err) => console.log(err));
    }, []);
    return (
      <div className="rank-wrapper">
        <h5>Top người dùng</h5>
        {console.log('rank user: ',rankUser)}
        {rankUser?.map((recipe, index) => {
          return (
            <Link
              to={`/user-page/${recipe.user_name}`}
              className="rank-item-wrapper"
              key={recipe.user_id}
            >
              <img
                src={recipe.avatar_image}
                alt={recipe.user_name}
                className="rank-item-img"
              />
              <div className="rank-item-content">
                <p>{recipe.user_name}</p>
                <div className="rank-item-detail rank-user-item-detail">
                  <span>Lượt xem công thức: {recipe.numberOfViews}</span>
                  <span>Số công thức: {recipe.numberOfRecipes}</span>
                </div>
              </div>
              <div className="rank-item-number">
                <span
                  className={`rank-item-number--${
                    index === 0 || index === 1 || index === 2 ? index + 1 : "after-3"
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  // }
})



export default RankUser;
