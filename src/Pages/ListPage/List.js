import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './List.css'

// import assets
import arrow from '../../assets/Arrow.svg'
import Loading from '../../assets/loading.gif'


// jsonURL
const listItems = 'https://pcfy.redberryinternship.ge/api/laptops?token=3322e8157adbc58f0e8a17914e5197e1';

function List() {

    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const getItems = async function () {
            try {
                const response = await fetch(listItems);
                const getData = await response.json();
                setItems(getData.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getItems();
    },[])


    if(loading){
        return (
            <div className='loading-container'>
                <img src={Loading} className="loading-gif"></img>
            </div>
        )
    }

  return (
    <section className='list-section'>

        <div className='list-header'>

            <Link to={'/'} className="list-arrow">
                <img src={arrow} className="list-mobile-arrow"></img>
            </Link>

            <Link to={'/'}>
                <div className='list-desktop-arrow-box'>
                    <img src={arrow}></img>
                </div>
            </Link>

            <h1 className='list-header-title'>ჩანაწერების სია</h1>
        </div>

    

        <div className="item-list-wrapper">
            {items.map((item, Index) => {
                const {laptop,user} = item;

                return (
                    <div className='list-card' key={Index}>
                        <div className='list-img'>
                            <img src={'https://pcfy.redberryinternship.ge/' + laptop.image}></img>
                        </div>

                        <div className='list-info'>
                            <h5>{user.name + ' ' + user.surname}</h5>
                            <p>{laptop.name}</p>
                            <Link to={`/detail/${laptop.id}`}>
                                <button className='detail-btn'>მეტის ნახვა</button>
                            </Link>
                        </div>

                    </div>
                )

            })}
        </div>

    </section>
    )
}

export default List