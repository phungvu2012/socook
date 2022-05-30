import React from 'react'
import notFoundImg from '../../assets/image/notFound/notFound.jpg';

const NotFound = () => {
  return (
    <div className='container d-flex justify-content-center mt-4'>
        <img src={notFoundImg} alt='Not Found' className='img-fluid' style={{width: '80%'}}/>
    </div>
  )
}

export default NotFound