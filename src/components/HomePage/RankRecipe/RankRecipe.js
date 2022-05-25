import "./RankRecipe.scss";
import { useEffect, useState } from "react";
import { memo } from "react";
import homePage from "../../../api/homePageApi";
import { Link } from "react-router-dom";

const RankRecipe = memo(() => {
  // function RankRecipe() {
  const [rankRecipeViewWeek, setRankRecipeViewWeek] = useState([]);

  useEffect(() => {
    homePage
      .getTopViewRecipeInWeek()
      .then((res) => {
        setRankRecipeViewWeek([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="rank-wrapper">
      <h5>Top lượt xem công thức tuần</h5>
      {rankRecipeViewWeek?.map((recipe, index) => {
        return (
          <Link
            to={`/recipe/${recipe.id}`}
            className="rank-item-wrapper"
            key={recipe.id}
          >
            <img
              src={recipe.main_image_url}
              alt={recipe.title}
              className="rank-item-img"
            />
            <div className="rank-item-content">
              <p>{recipe.title}</p>
              <div className="rank-item-detail">
                <span>Lượt xem: {recipe.total_views}</span>
                <span>Lượt thích: {recipe.total_likes}</span>
              </div>
            </div>
            <div className="rank-item-number">
              <span
                className={`rank-item-number--${
                  index === 0 || index === 1 || index === 2
                    ? index + 1
                    : "after-3"
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
});

export default RankRecipe;
