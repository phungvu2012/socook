import './FilterRecipePage'
import { useParams } from 'react-router-dom'

function FilterRecipePage() {
  const params = useParams()
  return (
    <>
    <p>{params.idFilter}</p>
    </>
  )
}

export default FilterRecipePage