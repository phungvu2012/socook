import React from 'react'
import { RecipeProvider } from './UpdateRecipeContext'
import Content from './Content'

const UpdateRecipe = () => {
  return (
    <RecipeProvider>
      <Content />
    </RecipeProvider>
  )
}

export default UpdateRecipe