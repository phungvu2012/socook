import './Loading.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Loading() {
  return (
    <div className='loading-container'>
      <div className="loading-overlay"></div>
      <div className="loading-icon-wrapper">
        <FontAwesomeIcon icon={faSpinner} className="loading-icon"/>
      </div>
    </div>
  )
}

export default Loading