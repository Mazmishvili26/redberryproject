import React from 'react'
import {Link} from 'react-router-dom'
import './Landing.css'

// import assets
import redberrylogo from '../../assets/redberrylogo.svg';
import group from '../../assets/group.svg'
import group2 from '../../assets/Group2.svg'

function Landing() {

    return (
        <div className='landing-container'>
            <div className='welcome-logo'>
                <img src={redberrylogo}></img>
            </div>

            <div className='main-img'>
                <img src={group} className="mobile-img"></img>
                <img src={group2} className="desktop-img"></img>
            </div>

            <div className='btn-container'>
                <Link to={'/create'}>
                    <button>ჩანაწერების დამატება</button>
                </Link>
                <Link to={'/list'}>
                    <button>ჩანაწერების სია</button>
                </Link>
            </div>

        </div>
    )

}

export default Landing;