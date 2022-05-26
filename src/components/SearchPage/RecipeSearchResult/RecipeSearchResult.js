import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";

function RecipesSearchResult(props) {
  return (
    <div className="collection-recipe-container">
      <Link
        to={`/recipe/${props.recipe.id}`}
        className="collection-recipe-wrapper"
      >
        <div className="collection-recipe-image-wrapper recipe-search-result-wrapper">
          <div className="image-overlay"></div>
          <img
            src={props.recipe.main_image_url}
            alt={props.recipe.title}
            className="collection-recipe-image"
          />
        </div>
        <div className="collection-recipe-info">
          <h5 className="collection-recipte-title">{props.recipe.title}</h5>
          <div className="collection-recipe-detail">
            <div className="collection-recipe-detail-number">
              <span>
                <FontAwesomeIcon icon={faClock} />
                {` ${props.recipe.cooking_time}`} phút
              </span>
              <span>
                <FontAwesomeIcon icon={faEye} />
                {` ${props.recipe.total_views}`}
              </span>
            </div>
            <p>Khẩu phần ăn: {props.recipe.amount_of_people} người</p>
          </div>
        </div>
      </Link>
      <Link
        to={`/user-page/${props.recipe.user_name}`}
        className="collection-recipe-owner"
      >
        <span>Người tạo:</span> {props.recipe.user_name}
      </Link>
    </div>
  );
}

export default RecipesSearchResult;
