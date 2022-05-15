import "./FilterRecipePage.scss";
import { useParams } from "react-router-dom";
import homePage from "../../../api/homePageApi";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function FilterRecipePage() {
  const { idFilter } = useParams();
  const [categoryFromGroup, setCategoryFromGroup] = useState([]);
  const [categorySelect, setCategorySelect] = useState("all");

  useEffect(() => {
    homePage
      .getCategoryInGroup(idFilter)
      .then((res) => {
        setCategoryFromGroup([...res.data]);
      })
      .catch((err) => console.log(err));
  }, [idFilter]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="category-group-container">
            <span
              className={`category-group-item ${
                "all" !== categorySelect ? "category-item-not-select" : ""
              }`}
              data-value="all"
              onClick={(e) => setCategorySelect(e.target.dataset.value)}
            >
              Tất cả
            </span>
            {categoryFromGroup?.map((category, index) => {
              return (
                <span
                  className={`category-group-item ${
                    category.name !== categorySelect
                      ? "category-item-not-select"
                      : ""
                  }`}
                  key={index}
                  data-value={category.name}
                  onClick={(e) => setCategorySelect(e.target.dataset.value)}
                >
                  {category.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterRecipePage;
