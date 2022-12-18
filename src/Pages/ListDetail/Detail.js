import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Detail.css'


// import assets

import Loading from '../../assets/loading.gif'
import arrow from '../../assets/Arrow.svg'
import line from '../../assets/line.svg'
import bigdesLine from '../../assets/bigdesline.svg'

// json url

const filterTeam = 'https://pcfy.redberryinternship.ge/api/teams';
const filterPosition = 'https://pcfy.redberryinternship.ge/api/positions';
const filterBrand = 'https://pcfy.redberryinternship.ge/api/brands';

const token = '3322e8157adbc58f0e8a17914e5197e1'

function Detail() {

    const [listItems,setListItems] = useState([]);
    const [loading,setLoading] = useState(true);

    const params = useParams();


    useEffect(() => {
        const fetchData = async function () {
            try {
                const response = await fetch(`https://pcfy.redberryinternship.ge/api/laptop/${params.listID}?token=${token}`);
                const getData = await response.json();
                setListItems(getData.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }  
        }
        fetchData();
    },[])


    // filterTeam/Position

    const [teams,setTeams] = useState([]);
    const [teamLoading,setTeamLoading] = useState(true);

    useEffect(() => {
        const getTeam = async function ()  {
            try {
                const response = await fetch(filterTeam);
                const getData = await response.json();
                setTeams(getData.data);
                setTeamLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getTeam();
    },[])



    const [position,setPosition] = useState([]);
    const [positionLoading,setPositionLoading] = useState(true);

    useEffect(() =>{
        const getPosition = async function () {
            try {
                const response = await fetch(filterPosition);
                const getData = await response.json();
                setPosition(getData.data);
                setPositionLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getPosition();
    },[])


    const [brands,setBrands] = useState([]); 
    const [brandLoading,setBrandLoading] = useState(true);

    useEffect(() => {
        const getBrand = async function () {
            try {
                const response = await fetch(filterBrand);
                const getData = await response.json();
                setBrands(getData.data);
                setBrandLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getBrand();
    },[])


    // filterTeam



    if(loading){
        return (
            <div className='loading-container'>
                <img src={Loading} className="loading-gif"></img>
            </div>
        )
    }

    if(teamLoading){
        return (
            <div className='loading-container'>
                <img src={Loading} className="loading-gif"></img>
            </div>
        )
    }

    if(positionLoading){
        return (
            <div className='loading-container'>
                <img src={Loading} className="loading-gif"></img>
            </div>
        )
    }

    if(brandLoading){
        return (
            <div className='loading-container'>
                <img src={Loading} className="loading-gif"></img>
            </div>
        )
    }


    // filterItem For Show without ID 

    const filterItem = teams.filter((team) => team.id === listItems.user.team_id);

    const filterPos = position.filter((pos) => pos.id === listItems.user.position_id);

    const filterBrnd = brands.filter((brand) => brand.id === listItems.laptop.brand_id);

    const number = listItems.user.phone_number;



    // translate laptopState to georgian
    if(listItems.laptop.state === "new"){
        listItems.laptop.state = "ახალი"
    }
    else if(listItems.laptop.state === "used"){
        listItems.laptop.state = "მეორადი"
    }


  return (
    <section className='detail-section'>

            <div className='detail-header'>
                <Link to={'/list'} className="detail-arrow-img detail-mobile">
                    <img src={arrow}></img>
                </Link>

                <Link to={'/list'}>
                    <div className='detail-desktop'>
                        <img src={arrow}></img>
                    </div>
                </Link>

                <h1 className='detail-main-title'>ლეპტოპის ინფო</h1>
            </div>

            <div className='detail-section-wrapper'>

                {/* first-detail-wrapper */}

                <div className='first-detail-wrapper'>

                        <div className='list-detail-wrapper'>
                            <div className='list-detail-img-block'>
                                <img src={'https://pcfy.redberryinternship.ge/' + listItems.laptop.image}></img>
                            </div>
                        </div>


                        <div className='person-info-wrapper'>

                            <div className='person-left'>
                                <ul className='person-left-ul'>
                                    <li>სახელი:</li>
                                    <li>თიმი:</li>
                                    <li>პოზიცია:</li>
                                    <li>მეილი:</li>
                                    <li>ტელ.ნომერი:</li>
                                </ul>
                            </div>

                        <div className='person-right'>

                            <ul className='person-right-ul'>
                                <li>{listItems.user.name + ' ' + listItems.user.surname}</li>
                                <li>{filterItem[0].name}</li>
                                <li>{filterPos[0].name}</li>
                                <li>{listItems.user.email}</li>
                                <li>{number.substr(0,4) + " " + number.substr(4,3) + " "  +number.substr(7,2) + " " + number.substr(9,2) + " " + number.substr(11,2)}</li>
                            </ul>

                        </div>

                </div>


                {/* ------------------------------------------------------------------------------------------------- */}

                </div>

                <div className='line-block mobile-line-block'>
                    <img src={line}></img>
                </div>

                <div className='line-block desktop-line-block'>
                    <img src={bigdesLine}></img>
                </div>

                {/*  */}



                <div className='second-detail-wrapper'>
                    
                    <div className='desktop-left'>

                        <div className='left-ul-wrapper'>
                            <ul>
                                <li>ლეპტოპის სახელი:</li>
                                <li>ლეპტოპის ბრენდი:</li>
                                <li>RAM:</li>
                                <li>მეხსიერების ტიპი:</li>
                            </ul>
                        </div>

                        <div className='left-ul-result'>
                            <ul>
                                <li>{listItems.laptop.name}</li>
                                <li>{filterBrnd[0].name}</li>
                                <li>{listItems.laptop.ram}</li>
                                <li>{listItems.laptop.hard_drive_type}</li>
                            </ul>
                        </div>
                    </div>


                    <div className='desktop-right'>

                        <div className='left-ul-wrapper'>
                            <ul>
                                <li>CPU:</li>
                                <li>CPU-ს ბირთვი:</li>
                                <li>CPU-ს ნაკადი:</li>
                            </ul>
                        </div>

                        <div className='left-ul-result'>
                            <ul>
                                <li>{listItems.laptop.cpu.name}</li>
                                <li>{listItems.laptop.cpu.cores}</li>
                                <li>{listItems.laptop.cpu.threads}</li>
                            </ul>
                        </div>

                    </div>
                    

                </div>


                <div className='line-block desktop-line-block'>
                    <img src={bigdesLine}></img>
                </div>


                {/*  */}


                <div className='laptop-info-wrapper mobile-info-wrapper'>

                    <div className='laptop-info-left-block'>
                        <ul className='laptop-left-info-ul'>

                            <li>ლეპტოპის სახელი:</li>
                            <li>ლეპტოპის ბრენდი:</li>
                            <li>RAM:</li>
                            <li>მეხსიერების ტიპი:</li>

                            <li>CPU:</li>
                            <li>CPU-ს ბირთვი:</li>
                            <li>CPU-ს ნაკადი:</li>
                        </ul>
                    </div>

                    <div className='laptop-info-right-block'>
                        <ul className='laptop-right-info-ul'>
                            <li>{listItems.laptop.name}</li>
                            <li>{filterBrnd[0].name}</li>
                            <li>{listItems.laptop.ram}</li>
                            <li>{listItems.laptop.hard_drive_type}</li>
                            <li>{listItems.laptop.cpu.name}</li>
                            <li>{listItems.laptop.cpu.cores}</li>
                            <li>{listItems.laptop.cpu.threads}</li>
                        </ul>
                    </div>

                </div>


                <div className='footer-line mobile-line-block'>
                    <img src={line}></img>
                </div>


                <div className='laptop-state-wrapper'>
                
                    <div className='state-wrapper'>
                        <div className='laptop-state-left-block'>
                            <ul className='laptop-state-left-ul'>
                                <li>მდგომარეობა:</li>
                                <li>ლეპტოპის ფასი:</li>
                            </ul>
                        </div>

                        <div className='laptop-state-right-block'>
                            <ul className='laptop-state-right-ul'>
                                <li>{listItems.laptop.state}</li>
                                <li>{listItems.laptop.price} $</li>
                            </ul>
                        </div>
                    </div>


                    <div className='add-new-btn'>
                        <Link to={'/create'}>
                            <button>ახალი ჩანაწერი</button>
                        </Link>
                    </div>

                </div>



        </div>
        

    </section>
  )
}

export default Detail