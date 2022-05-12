import './RankRecipe.scss'
import { useEffect, useState } from 'react'
import homePage from '../../../api/homePageApi'

function RankRecipe() {
  const [rankRecipeViewWeek, setRankRecipeViewWeek] = useState([])

  useEffect(() => {
    homePage.getTopViewRecipeInWeek()
    .then(res => {
      console.log(res)
      // setRankRecipeViewWeek([...res.data])
    })
    .catch(err => console.log(err))
  },[])
  return (
    <>
      {console.log('RRIW: ', rankRecipeViewWeek)}
    </>
  )
}

export default RankRecipe