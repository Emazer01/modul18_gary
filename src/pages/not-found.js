import React from 'react'
import logo_404 from '../404.webp'
import {useNavigate} from 'react-router-dom';

// Modifikasi halaman berikut untuk menjadi halaman 404 yang menarik!
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='cont'>
      <div className='not'>
        <img src={logo_404} className='logo_not'/>
        <h1 className='H_not'>Not Found.</h1>
      </div>
      <div className='not'>
        <h2 className='H2_not'>Try / or </h2>
        <button onClick={()=>{
          navigate('../')
          window.location.reload()
      }}>Click Here!</button>
      </div>
    </div>
  )
}

export default NotFound