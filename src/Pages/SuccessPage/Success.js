import React from 'react'
import {Link} from 'react-router-dom'
import './Success.css'

// import assets

import success from '../../assets/succ.svg'

function Success() {
  return (
    <section className='success-section'>

      <div className='mobile-succes'>

          <div className='success-img-block'>
            <img src={success}></img>
          </div>

          <div className='success-msg'>
            <h1>ჩანაწერი დამატებულია!</h1>
          </div>

          <div className='success-btn-container'>
            <Link to={'/list'}>
              <button className='success-list'>სიაში გადაყვანა</button>
            </Link>
            <Link to={'/'} className="go-home-block">
              <button className='go-home-btn'>მთავარი</button>
            </Link>
          </div>

      </div>


      <div className='desktop-success'>
          <div className='success-container'>
              <img src={success} className="success-img"></img>
              <h1>ჩანაწერი დამატებულია!</h1>
              <Link to={'/list'}>
                <button className='back-to-list-btn'>სიაში გადაყვანა</button>
              </Link>
              <Link to={'/'}>
                <button className='home-btn'>მთავარი</button>
              </Link>
          </div>
      </div>
      

    </section>
  )
}

export default Success