import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import validator from 'validator'
import './Create.css'


// import assets
import Arrow from '../../assets/Arrow.svg'
import logo from '../../assets/logo.svg'
import headerLine from '../../assets/header-line.svg'
import headerLine2 from '../../assets/line2.svg'

// import Components
import SecondPage from '../SecondPage/SecondPage'


// json urls
const teamsURL = 'https://pcfy.redberryinternship.ge/api/teams'
const positionURL = 'https://pcfy.redberryinternship.ge/api/positions'

function Create() {

    // for select nameChanger

    const [teamName,setTeamName] = useState('თიმი');

    const [positionName,setPositionName] = useState('პოზიცია');

    // for select nameChanger


    // saveTeamID for positionValue
    const [saveID,setSaveID] = useState(0);
    // saveTeamID for positionValue


    // savePositionID

    const [positionID,setPositionID] = useState(0);

    // savePositionID


    // for apiStates
    const [teams,setTeams] = useState([]);
    const [positions,setPositions] = useState([]);
    // for apiStates


    // for open/close select menus
    const [openTeam, setOpenTeam] = useState(false);
    const [openPosition,setOpenPosition] = useState(false);
    // for open/close select menus



    // avoid space in telephone input

    const handleKey = (e) => {
        let key = e.charCode;
        if(key === 32){
            e.preventDefault();
        }
    }

    // avoid space in telephone input

    // getTeams

    useEffect(() => {
        const getTeams = async function () {
            try {
                    const response = await fetch(teamsURL);
                    const getData = await response.json();
                    setTeams(getData.data);
            } catch (error) {
                    console.log(error);
            }
        }
        getTeams();
    },[])

     // getTeams


    //  getPositions

    useEffect(() => {
        const getPositions = async function () {
            try {
                const response = await fetch(positionURL);
                const getData = await response.json();
                setPositions(getData.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPositions();
    },[])


    const handleTeam = (e , id) => {
        setTeamName(e.target.innerText);
        setOpenTeam(false);
        setSaveID(id);
        setPositionName('პოზიცია');
        formData.teamValue = e.target.innerText;
    }

    const handlePosition = (e,id) => {
        setPositionName(e.target.innerText);
        setOpenPosition(false);
        setPositionID(id);
        formData.positionValue = e.target.innerText;
    }

    const filterPositions = positions.filter((item) => item.team_id === saveID);


    // cases

    const [formData,setFormData] = useState( getLocalStorageData , {
        name:'',
        surname:'',
        teamValue : '',
        positionValue : '',
        email : '',
        tel: '',
        laptopName:'',
        laptop_image: '',
        laptop_brand_id : '',
        laptop_cpu : '',
        laptop_cpu_cores : '',
        laptop_cpu_threads : '',
        laptop_ram : '',
        laptop_hard_drive_type : '',
        laptop_price:'',
        laptop_state : '',
    })
    

    // saveIntoLocalStorage


    useEffect(() => {
        localStorage.setItem('createInfo', JSON.stringify(formData));
    })

    function getLocalStorageData () {
        const storedValues = localStorage.getItem('createInfo') ? JSON.parse(localStorage.getItem('createInfo')) : {
            name:'',
            surname:'',
            teamValue : '',
            positionValue : '',
            email : '',
            tel: '',
            laptopName:'',
            laptop_image: '',
            laptop_brand_id : '',
            laptop_cpu : '',
            laptop_cpu_cores : '',
            laptop_cpu_threads : '',
            laptop_ram : '',
            laptop_hard_drive_type : '',
            laptop_price:'',
            laptop_state : '',
        };
        return storedValues;
    } 

    // saveIntoLocalStorage


    const handleFormData = input => e => {

        const {value} = e.target;

        setFormData(prevState => ({
            ...prevState,
            [input]: value
        }))
    }

    const [errorValue,setErrorValue] = useState({
        fError : '',
        lError : '',
        teamValue : '',
        positionValue: '',
        eError : '',
        telError : '',
        laptopNameError : '',
        laptopImgError : '',
        laptopBrandError : '',
        cpuError : '',
        cpuCoreError : '',
        cpuThreadError : '',
        laptopRamError : '',
        hardDriveError :  '',
        PriceError : '',
        stateError : ''
    })

    const [step,setStep] = useState(0);

    const nextStep  = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        if(step === 1){
            setStep(step - 1);
        }
    }


    // nextStep Validation
    
    const submitFormData = (e) => {
        e.preventDefault();

                // 1) firstName Validation  
                    if(!validator.matches(formData.name, /^[ა-ჰ]{2,}$/)){
                        errorValue.fError = 'გამოიყენე მინიმუმ 2 ქართული ასო';
                    }
                    else{
                        errorValue.fError = ""
                    }
                    // firstName Validation       

// -----------------------------------------------------------------------------------------------

                // 2) Lastname validation

                    if(!validator.matches(formData.surname, /^[ა-ჰ]{2,}$/)){
                        errorValue.lError = 'გამოიყენე მინიმუმ 2 ქართული ასო'
                    }
                    else{
                        errorValue.lError = ""
                    }

                // Lastname validation

// -----------------------------------------------------------------------------------------------
                
                // 3) teamSelectMenu Validation


                    if(validator.matches(formData.teamValue, "")){
                        errorValue.teamValue = true;
                    }
                    if(validator.matches(formData.teamValue, teamName)){
                        errorValue.teamValue = false;
                        // formData.teamValue = teamName;
                    }
                    // teamSelectMenu Validation

// -----------------------------------------------------------------------------------------------

                // 4) positionSelectMenu Validation
                
                    if(validator.matches(formData.positionValue, "")){
                        errorValue.positionValue = true;
                    }
                    if(validator.matches(formData.positionValue, positionName)){
                        errorValue.positionValue = false;
                    }


// -----------------------------------------------------------------------------------------------


                // 4) email validation
                    if(!validator.matches(formData.email, /[a-z0-9]+@redberry.ge$/)){
                        errorValue.eError = 'აუცილებელია მთავრდებოდეს @redberry.ge-ით'
                    }
                    else{
                        errorValue.eError = ""
                    }
                // email validation

// -----------------------------------------------------------------------------------------------

                // 5) number validation
                    if(!validator.matches(formData.tel, /^(\+995)(79\d{7}|5\d{8})$/ )){
                        setErrorValue({...errorValue, telError : 'აუცილებლად გამოიყენეთ ქართული მობ-ნომერი' })
                    }
                    else{
                        errorValue.telError = '';
                        setErrorValue({...errorValue, telError : "" })
                    }
                // number validation
                
// -----------------------------------------------------------------------------------------------

                // next Step validation
                if(validator.matches(formData.name, /^[ა-ჰ]{2,}$/) && validator.matches(formData.surname, /^[ა-ჰ]{2,}$/) && validator.matches(formData.teamValue, teamName) && validator.matches(formData.positionValue, positionName) && validator.matches(formData.email, /[a-z0-9]+@redberry.ge/) && validator.matches(formData.tel, /^(\+995)(79\d{7}|5\d{8})$/ )){
                    nextStep();
                }
            }


 return (
    <div className='main-container'>

        <div className='main-header mobile-header'>

            <div className='header-arrow'>
                {step === 0 ?  <Link to={'/'}><img src={Arrow} onClick={prevStep}></img></Link> : <img src={Arrow} onClick={prevStep}></img>}
            </div> 

            <div className='header-title-wrapper'>
                <div className='header-title'>
                    <h1>{step === 1 ? 'ლეპტოპის მახასიათებლები' : 'თანამშრომლის ინფო'}</h1>
                </div>

                <div className='header-page-counter'>
                    <p>{step === 1 ? '2/2' : '1/2'}</p>
                </div>
            </div>

        </div>


        <div className='desktop-header'>
            <Link to={'/'}>
                <div className='arrow-box'>
                    <img src={Arrow}></img>
                </div>
            </Link>

            <div className='header-navigation'>
                
                <div className='header-title'>
                    <h1 onClick={() => setStep(0)}>თანამშრომლის ინფო</h1>
                    {step === 0 ? <div className='active-line'>
                        <img src={headerLine} className="header-line"></img>
                    </div> : null}
                </div>

                <div className='header-title'>
                    <h1 onClick={submitFormData}>ლეპტოპის მახასიათებლები</h1>
                    {step === 1 ? <div className='step2-active'>
                        <img src={headerLine2} className="header2-line"></img>
                    </div> : null}
                </div> 

            </div>
        </div>

        {/*  */}

        <div className='form-container'>
            {/* first step */}

            {step === 0 ?

                <div className='page-container'>

                    <form onSubmit={submitFormData}>

                    <div className='input-wrapper'>
                        <div className='input-box'>
                            <label htmlFor='name' className={errorValue.fError ? 'error-warning' : null}>სახელი</label>
                            <input 
                                id='name' 
                                name='name' 
                                type='text' 
                                placeholder='ნიკა'
                                defaultValue={formData.name}
                                onChange={handleFormData("name")}
                            />
                            <p className={errorValue.fError ? 'error-warning' : null}>{errorValue.fError ? errorValue.fError : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'  }</p>
                        </div>

                        <div className='input-box'>
                            <label htmlFor='surname' className={errorValue.lError ? 'error-warning' : null}>გვარი</label>
                            <input 
                                id='surname' 
                                name='surname' 
                                type='text' 
                                placeholder='მაზმიშვილი'
                                defaultValue={formData.surname}
                                onChange={handleFormData("surname")}
                            />
                            <p className={errorValue.lError ? 'error-warning' : null}>{errorValue.lError ? errorValue.lError : 'მინიმუმ 2 სიმბოლო, ქართული ასოები'}</p>
                        </div>
                    </div>


                    {/* */}

                    <div className='select-box team-select'>
                        <div className={errorValue.teamValue === true ? 'select-error' : 'select'}>
                            <p>{teamName}</p>
                            <img src={Arrow} onClick={() => setOpenTeam(!openTeam)}></img>
                        </div>
                        
                        {openTeam && 
                            <div className='select-container'>
                                <ul className='select-ul'>
                                    {teams.map((team) => {
                                        const {id,name} = team;
                                        return <li key={id} className="select-li" onClick={(e) => handleTeam(e , id)}>{name}</li>
                                    })}
                                </ul>
                            </div>
                        }
                    </div>

                    {/*  */}

                    <div className='select-box'>
                        <div className={errorValue.positionValue === true ? 'select-error' : 'select'}>
                            <p>{positionName}</p>
                            <img src={Arrow} onClick={() => setOpenPosition(!openPosition)}></img>
                        </div>
                        
                        {openPosition && 
                            <div className='select-container position-select'>
                                <ul className='select-ul'>
                                    {filterPositions.map((position) => {
                                        const {id,name,team_id} = position;
                                        return <li key={id} className="select-li" onClick={(e) => handlePosition(e , id)}>{name}</li>
                                    })}
                                </ul>
                            </div>
                        }

                    </div>

                    {/*  */}

                    <div className='input-box email-inputbox'>
                        <label htmlFor='email' className={errorValue.eError ? 'error-warning' : null}>იმეილი</label>
                        <input 
                            id='email' 
                            name='email' 
                            type='email' 
                            placeholder='mazmishvili26@redberry.ge'
                            defaultValue={formData.email}
                            onChange={handleFormData("email")}
                            className="email-input"
                        />
                        <p className={errorValue.eError ? 'error-warning' : null}>{errorValue.eError  ? errorValue.eError : 'უნდა მთავრდებოდეს @redberry.ge-ით'  }</p>
                    </div>


                    <div className='input-box tel-inputbox'>
                        <label htmlFor='tel' className={errorValue.telError ? 'error-warning' : null}>ტელეფონის ნომერი</label>
                        <input 
                            id='tel' 
                            name='tel' 
                            type='text' 
                            placeholder='+995 593 20 99 77'
                            defaultValue={formData.tel}
                            onChange={handleFormData("tel")}
                            onKeyPress={(e) => handleKey(e)}
                            className="tel-input"
                        />
                        <p className={errorValue.telError ? 'error-warning' : null}>{errorValue.telError ? errorValue.telError : 'ქართული მობ-ნომრის ფორმატი' }</p>
                    </div>

                    {/*  */}

                    <div className='next-btn-box'>
                        <button className='next-btn' type='submit'>შემდეგი</button>
                    </div>
            
                    </form> 

                    <img src={logo} className="logo-img"></img>
    
                </div>

                

                :

                // meore step
                    <SecondPage 
                        formData={formData} 
                        errorValue={errorValue} 
                        handleFormData={handleFormData} 
                        prevStep={prevStep}
                        setErrorValue={setErrorValue}
                        teamID={saveID}
                        positionID={positionID}
                        getLocalStorageData={getLocalStorageData}
                        setFormData={setFormData}
                    />
                }
            
        </div>
        

    </div>
    )
}

export default Create