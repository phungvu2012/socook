import React from 'react'
import { RecipeProvider } from './AddRecipeContext'
import Content from './Content'

const CreateRecipe = () => {
  return (
    <RecipeProvider>
      <Content />
    </RecipeProvider>
  )
}

export default CreateRecipe