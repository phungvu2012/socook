import { useParams } from 'react-router-dom'
import './SearchPage.scss'

function SearchPage() {
  const params = useParams()
  return (
    <>
      Hello, this is search page for {params.keyword}
    </>
  )
}

export default SearchPage