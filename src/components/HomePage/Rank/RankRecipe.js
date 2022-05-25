import "./RankRecipe.scss";
import { useEffect, useState } from "react";
import homePage from "../../../api/homePageApi";

function RankRecipe() {
  const [rankRecipeViewWeek, setRankRecipeViewWeek] = useState([]);

  useEffect(() => {
    homePage
      .getTopViewRecipeInWeek()
      .then((res) => {
        // setRankRecipeViewWeek([...res.data])
      })
      .catch((err) => console.log(err));
  }, []);
  return <></>;
}

export default RankRecipe;
