import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'

// import components
import UploadPhoto from '../../Components/UploadPhotoComponent/UploadPhoto'

// import assets
import Arrow from '../../assets/Arrow.svg'
import err from '../../assets/err.svg'
import bigLine from '../../assets/bigline.svg'
import Loading from '../../assets/loading.gif'
import money from '../../assets/money.svg'

// apiURL
const brandURL = 'https://pcfy.redberryinternship.ge/api/brands'
const cpuURL = 'https://pcfy.redberryinternship.ge/api/cpus'

function Laptop({ formData, errorValue, prevStep , setErrorValue , teamID , positionID , handleFormData}) {


  // for navigation

  const navigate = useNavigate();

  // for navigation

  // saveFileName

  const [saveFileName,setSaveFileName] = useState(' ');
  const [saveIMG,setSaveIMG] = useState('');


  // saveFileName

  // selectNameGenerator

  const [brandName,setBrandName] = useState('ლეპტოპის ბრენდი');
  const [openBrand,setOpenBrand] = useState(false);

  const [cpuName,setCpuName] = useState('CPU');
  const [openCPU,setOpenCPU] = useState(false);

  // selectNameGenerator

  // getLaptopBrandFromAPI

  const [brands,setBrands] = useState([]);

  useEffect(() => {
    const getBrand = async function () {
      const response = await fetch(brandURL);
      const getData = await response.json();
      setBrands(getData.data);
    }
    getBrand();
  },[])

  // getLaptopBrandFromAPI

  
  // GetLaptopCPUFromApi

  const [getCPU,setGetCPU] = useState([]);

  useEffect(() => {
    const getCPU = async function () {
      const response = await fetch(cpuURL);
      const getData = await response.json();
      setGetCPU(getData.data);
    }
    getCPU();
  },[])

  // GetLaptopCPUFromApi


  // brandSelectHandler

  const [brandID,setBrandID] = useState(0);

  const handleBrand = (e, id) => {
    setBrandName(e.target.innerText);
    setOpenBrand(false);
    setBrandID(id);
    formData.laptop_brand_id = e.target.innerText;
  }

  // brandSelectHandler


  // cpuSelectHandler

  const handleCPU = (e) => {
    setCpuName(e.target.innerText);
    setOpenCPU(false);
    formData.laptop_cpu = e.target.innerText;
  }



  // save HarDriveTypeData For Validation

  const [saveData,setSaveData] = useState(' ');

    const handleSSD = (e) => {
        formData.laptop_hard_drive_type = e.target.defaultValue;
        setSaveData(e.target.defaultValue);
    }

    const handleHDD = (e) => {
      formData.laptop_hard_drive_type = e.target.defaultValue;
      setSaveData(e.target.defaultValue);
    }

  // save HarDriveTypeData For Validation



  // save laptopStateData for Validaiton

  const [saveStateData,setSaveStateData] = useState(' ');

  const handleNew = (e) => {
    formData.laptop_state = e.target.defaultValue;
    setSaveStateData(e.target.defaultValue)
  }

  const handleUsed = (e) => {
    let old = e.target.defaultValue;

    if(old === "old"){
      old = "used";
    }
    formData.laptop_state = old;
    setSaveStateData(old);
  }

   // save laptopStateData for Validaiton



    // submitFormData

    const [validatorLoading,setValidatorLoading] = useState(false);

  const submitFormData = (e) => {
    e.preventDefault();

      // 6) laptopName validation

        if(!validator.matches(formData.laptopName, /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/ )){
            errorValue.laptopNameError = "აუცილებლად გამოიყენე ლათინური ასოები"
        }
        else{
            errorValue.laptopNameError = ""
        }


      // laptopIMG validation
      
      if(!validator.matches(formData.laptop_image, saveFileName)){
        errorValue.laptopImgError = true;
      }
      else{
        errorValue.laptopImgError = false;
      }

      // 7) LaptopBrandSelect Validation

        if(!validator.matches(formData.laptop_brand_id, brandName)){
          errorValue.laptopBrandError = true;
        }
        else{
          errorValue.laptopBrandError = false;
        }

      // 8) CPUValue Validation

        if(!validator.matches(formData.laptop_cpu , cpuName)){
          errorValue.cpuError = true;
        }
        else{
          errorValue.cpuError = false;
        }

      // 9) cpuCore validation

        if(!validator.matches(formData.laptop_cpu_cores, /^\d+$/)){
          errorValue.cpuCoreError = 'გამოიყენე მხოლოდ ციფრები!';
        }
        else{
          errorValue.cpuCoreError = '';
        }


      // 10) cpuThread Validation

      if(!validator.matches(formData.laptop_cpu_threads, /^\d+$/)){
        errorValue.cpuThreadError = 'გამოიყენე მხოლოდ ციფრები!';
      }
      else{
        errorValue.cpuThreadError = '';
      }


      // 11) cpuRam Validation

      if(!validator.matches(formData.laptop_ram, /^\d+$/)){
        errorValue.laptopRamError = 'გამოიყენე მხოლოდ ციფრები!';
      }
      else{
        errorValue.laptopRamError = '';
      }


      // 12) laptopHardDrive Validation

      if(!validator.matches(formData.laptop_hard_drive_type, saveData)){
        errorValue.hardDriveError = true;
      }
      else{
        errorValue.hardDriveError = false;
      }


      // 13) laptopPriceValidation

    
      if(!validator.matches(formData.laptop_price, /^\d+$/)){
        errorValue.PriceError = 'გამოიყენე მხოლოდ ციფრები!';
      }
      else{
        errorValue.PriceError = '';
      }

      // 14 laptopStateValidation

      if(!validator.matches(formData.laptop_state, saveStateData)){
        setErrorValue({...errorValue, stateError : true })
      }
      else{
        setErrorValue({...errorValue, stateError : false })
      }


      const token = '3322e8157adbc58f0e8a17914e5197e1'

      const options = {
        headers: {'Content-Type' : 'multipart/form-data'}
      }

      // make Post Request to server

      if(validator.matches(formData.laptopName, /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/) && validator.matches(formData.laptop_image, saveFileName) && validator.matches(formData.laptop_brand_id, brandName) && validator.matches(formData.laptop_cpu , cpuName) && validator.matches(formData.laptop_cpu_cores, /^\d+$/) && validator.matches(formData.laptop_cpu_threads, /^\d+$/) && validator.matches(formData.laptop_ram, /^\d+$/) && validator.matches(formData.laptop_hard_drive_type, saveData) && validator.matches(formData.laptop_price, /^\d+$/) && validator.matches(formData.laptop_state, saveStateData) )
      {
        setValidatorLoading(true);
        axios.post('https://pcfy.redberryinternship.ge/api/laptop/create/', {
          name : formData.name,
          surname : formData.surname,
          team_id : teamID,
          position_id : positionID,
          phone_number : formData.tel,
          email : formData.email,
          token : token,
          laptop_name : formData.laptopName,
          laptop_image : saveIMG,
          laptop_brand_id : brandID,
          laptop_cpu : cpuName,
          laptop_cpu_cores : formData.laptop_cpu_cores,
          laptop_cpu_threads : formData.laptop_cpu_threads,
          laptop_ram : formData.laptop_ram,
          laptop_hard_drive_type : formData.laptop_hard_drive_type,
          laptop_state : formData.laptop_state,
          laptop_price : formData.laptop_price
        },options)
          .then(function (response) {
            setValidatorLoading(false);
            console.log(response);
            navigate('/success');
            localStorage.clear('createInfo');
          })
          .catch(function (error) {
            setValidatorLoading(false);
            if(error.response.data.errors.laptop_image){
              alert('წარუმატებელი მცდელობა, გთხოვთ ატვირთეთ შედარებით მცირე ზომის ლეპტოპის სურათი!');
            }
            else{
              alert('წარუმატებელი მცდელობა !' + error);
            }
          });
      }
  }


  if(validatorLoading){
      return (
        <div className='loading-container'>
              <div className="validator-loading">
                <p>გთხოვთ მოიცადოთ, ინფორმაცია მუშავდება!</p>
                <img src={Loading}></img>
              </div>
        </div>
    )
  }


  return (
    <form onSubmit={submitFormData}>

      <div className='second-page-container'>


          <UploadPhoto setSaveFileName={setSaveFileName} errorValue={errorValue} formData={formData} setSaveIMG={setSaveIMG}/>

          {/* -------------------------------------------------------------------------------- */}


          <div className='laptop-first-wrapper'>

            <div className='input-box laptop-name-input'>
                <label htmlFor='laptopName' className={errorValue.laptopNameError ? 'error-warning' : null}>ლეპტოპის სახელი</label>
                <input 
                    id='laptopName' 
                    name='laptopName' 
                    type='text' 
                    placeholder='HP'
                    defaultValue={formData.laptopName}
                    onChange={handleFormData("laptopName")}
                    className="laptop-name-input"
                />
                <p className={errorValue.laptopNameError ? 'error-warning' : null}>{errorValue.laptopNameError ? errorValue.laptopNameError : 'ლათინური ასოები, ციფრები, !@#$%^&*_+'}</p>
            </div>


            <div className='select-box laptop-brand-select'>

                <div className={errorValue.laptopBrandError === true ? 'select-error laptop-select-error' : 'select laptop-select'}>
                    <p>{brandName}</p>
                    <img src={Arrow} onClick={() => setOpenBrand(!openBrand)}></img>
                </div>
                        
                {openBrand && 
                      <div className='select-container brand-select-container'>
                          <ul className='select-ul'>
                              {brands.map((brand) => {
                                const {id,name} = brand;
                                return <li key={id} className="select-li" onClick={(e) => handleBrand(e, id)}>{name}</li>
                              })}
                          </ul>
                      </div>
                          }
              </div>
              
          </div>


          <div className='first-laptop-line'>
              <img src={bigLine}></img>
          </div>

          {/* -------------------------------------------------------------------------------------------------- */}


            <div className='laptop-second-wrapper'>

              <div className='select-box laptop-cpu-select'>

                <div className={errorValue.cpuError === true ? 'select-error cpu-error' : 'select cpu-select'}>
                    <p>{cpuName}</p>
                    <img src={Arrow} onClick={() => setOpenCPU(!openCPU)}></img>
                </div>
                        
                {openCPU && 
                      <div className='select-container cpu-select-container'>
                          <ul className='select-ul'>
                              {getCPU.map((cpu) => {
                                const {id,name} = cpu;
                              return <li key={id} className="select-li" onClick={(e) => handleCPU(e)}>{name}</li>
                              })}
                          </ul>
                      </div>
                        }
                </div>

                <div className='input-box laptop laptop-cpu'>
                    <label htmlFor='laptop_cpu_cores' className={errorValue.cpuCoreError ? 'error-warning' : null}>CPU-ს ბირთვი</label>
                    <input 
                        id='laptop_cpu_cores' 
                        name='laptop_cpu_cores' 
                        type='text' 
                        placeholder='14'
                        defaultValue={formData.laptop_cpu_cores}
                        onChange={handleFormData("laptop_cpu_cores")}
                        className="laptop-cpu-input"
                    />
                    <p className={errorValue.cpuCoreError ? 'error-warning' : null}>{errorValue.cpuCoreError ? errorValue.cpuCoreError : 'მხოლოდ ციფრები'  }</p>
                </div>


                <div className='input-box laptop laptop-thread'>
                    <label htmlFor='laptop_cpu_threads' className={errorValue.cpuThreadError ? 'error-warning' : null}>CPU-ს ნაკადი</label>
                    <input 
                        id='laptop_cpu_threads' 
                        name='laptop_cpu_threads' 
                        type='number' 
                        placeholder='365'
                        defaultValue={formData.laptop_cpu_threads}
                        onChange={handleFormData("laptop_cpu_threads")}
                        className="laptop-thread-input"
                    />
                    <p className={errorValue.cpuThreadError ? 'error-warning' : null}>{errorValue.cpuThreadError ? errorValue.cpuThreadError : 'მხოლოდ ციფრები'  }</p>
                </div>

            </div>


          {/* -------------------------------------------------------------------------------------------------- */}


          <div className='laptop-third-wrapper'>
            <div className='input-box laptop'>
                <label htmlFor='laptop_ram' className={errorValue.laptopRamError ? 'error-warning' : null}>ლეპტოპის RAM (GB)</label>
                <input 
                    id='laptop_ram' 
                    name='laptop_ram' 
                    type='number' 
                    placeholder='16'
                    defaultValue={formData.laptop_ram}
                    onChange={handleFormData("laptop_ram")}
                />
                <p className={errorValue.laptopRamError ? 'error-warning' : null}>{errorValue.laptopRamError ? errorValue.laptopRamError : 'მხოლოდ ციფრები'  }</p>
            </div>


            <div className='radio-container laptop-radio'>
              <div className='radio-title'>
                <p className={errorValue.hardDriveError ? 'radio-error' : null}>მეხსიერების ტიპი</p>
                {errorValue.hardDriveError ? <img src={err}></img> : null}
              </div>
              <div className='radio-container-wrapper'>
                <div className='radio-input-box'>
                  <input type="radio" value="SSD" name="memory" className='radio-input' onClick={(e) => handleSSD(e)}/> SSD
                </div>
                <input type="radio" value="HDD" name="memory" onClick={(e) => handleHDD(e)} /> HDD
              </div>
            </div>
          </div>



          <div className='first-laptop-line'>
              <img src={bigLine}></img>
          </div>


        {/* -------------------------------------------------------------------------------------------------- */}


          <div className='laptop-fourth-wrapper'>

            <div className='input-box laptop money-laptop'>
                <label htmlFor='laptop_price' className={errorValue.PriceError ? 'error-warning' : null}>ლეპტოპის ფასი</label>
                <input 
                    id='laptop_price' 
                    name='laptop_price' 
                    type='number' 
                    placeholder='0000'
                    defaultValue={formData.laptop_price}
                    onChange={handleFormData("laptop_price")}
                />
                <p className={errorValue.PriceError ? 'error-warning' : null}>{errorValue.PriceError ? errorValue.PriceError : 'მხოლოდ ციფრები'  }</p>
                <img src={money} className="money-img"></img>
            </div>



            <div className='radio-container laptop-health'>
              <div className='radio-title'>
                  <p className={errorValue.stateError ? 'radio-error' : null}>ლეპტოპის მდგომარეობა</p>
                  {errorValue.stateError ? <img src={err}></img> : null}
              </div>
              <div className='radio-container-wrapper'>
                <div className='radio-input-box'>
                  <input type="radio" value="new" name="health" className='radio-input' onClick={(e) => handleNew(e)}/> ახალი
                </div>
                <input type="radio" value="old" name="health" onClick={(e) => handleUsed(e)}/> მეორადი
              </div>
            </div>

          </div>



          {/*  */}

          <div className='laptop-footer'>
              <button className='go-back-btn' onClick={prevStep}>უკან</button>
              <button className='submit-btn' type='submit'>დამახსოვრება</button>
          </div>

        </div>

    </form>
  )
}

export default Laptop