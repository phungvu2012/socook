import { filter } from "draft-js/lib/DefaultDraftBlockRenderMap";
import React, { useState, useContext, useEffect } from "react";

import { RecipeContext } from "./AddRecipeContext";

function Category({index}) {
  const context = useContext(RecipeContext);
  const [ categoryArr, setCategoryArr ] = useState();
  const [name, setName] = useState(context.category);

  useEffect(() => {
    setName(context.category);
  })

  useEffect(() => {
    // console.log('categoryArr: ', categoryArr);
    setCategoryArr(context.categoryList);
  }, [context.categoryList])

  useEffect(() => {
    // console.log('Rerender Category!', context.category)
  }, [context.category])

  const handleRemoveCategoryItem = (item) => {
    console.log('remove: ', item)
    const newCategory = context?.category && context.category.filter((value) => {
      return value != item;
    })
    context.setCategory(newCategory);
  }

  const handleAddCategoryItem = (item) => {
    context.setCategory([...context.category, item]);
  }

  return (
    <div className="recipe-category-box">
      {
        categoryArr?.length && categoryArr.map((value) => {
          return (
            <div className="recipe-category-group" key={value?.id}>
              <div className="recipe-category__header">
                <span>{value?.name}</span>
              </div>
              <div className="recipe-category__list-item">
                {
                  value?.category?.length && value?.category?.map((item) => {
                    return (
                      (name?.length && item?.name && name?.indexOf(item?.name) !== -1) ?
                        <span className="recipe-category__item active" key={item?.id} onClick={() => handleRemoveCategoryItem(item?.name)}>{item?.name}</span> :
                        <span className="recipe-category__item" key={item?.id} onClick={() => handleAddCategoryItem(item?.name)}>{item?.name}</span>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Category;
