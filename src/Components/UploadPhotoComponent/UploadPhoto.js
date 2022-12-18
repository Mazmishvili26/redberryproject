import React, { useEffect, useState } from 'react'

// import assets
import upload from '../../assets/upload.svg'
import camera from '../../assets/camera.svg'
import success from '../../assets/success.svg'
import imgerr from '../../assets/imgerr.jpg'
import err from '../../assets/err.svg'
import upld from '../../assets/upld.svg'
import bigErr from '../../assets/bigerr.svg'


function Laptop({setSaveFileName , errorValue , formData , setSaveIMG}) {

    const [files,setFiles] = useState('');
    const [img,setImg] = useState('');
    const [dragActive,setDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        if(e.target.className == "upload-photo"){
            setDragActive(true);
        }
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        if(e.target.className !== "photo-active"){
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
    }


    const handleFile = (e) => {
        setFiles(e.target.files);
        setImg(e.target.files);
    }


    // saveFileName for validation
        useEffect(() => {
            const saveFileName = () => {
                {Array.from(files).map((file) => {
                    setSaveFileName(file.name);
                    formData.laptop_image = file.name;
                    setSaveIMG(file);
                })}
            }
            saveFileName();
        })


    // saveFileName for validation




  return (
    <section className='laptop-section'>

        <div className='upload-photo-container'  onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={(e) => handleDragEnter(e)} onDragLeave={(e) => handleDragLeave(e)}>
            <input type='file' name='fileUpload' id='fileUpload' onChange={(e) => handleFile(e)}></input>
            {files ? 
                <div>
                    {Array.from(files).map((file,id) => 
                        formData.laptop_image && <img className="added-photo desktop-added-photo" src={file ? URL.createObjectURL(file) : null} key={id} id="img"></img>
                    )}

                    <div className='img-information'>
                        {Array.from(files).map((file, id) => {

                            const bytes = file.size;

                            function readableBytes(bytes)
                            {
                                
                                var i = Math.floor(Math.log(bytes) / Math.log(1024)),
                                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                        
                                let result = (bytes / Math.pow(1024, i)).toFixed(1) * 1 + '  ';
                                let size = sizes[i];
                                return result + size;
                            }

                            return (
                                <div className='img-success' key={id}>  

                                    <img src={success}></img>
                                
                                    <div>
                                        <p className='file-name'>{file.name}</p>
                                        <p className='img-size'>{readableBytes(bytes)}</p>
                                    </div>

                                </div>
                            )
                        })}
                        
                        <label htmlFor='fileUpload' className='re-upload-btn'>
                            თავიდან ატვირთე
                        </label>

                    </div>

                </div> 
                :
                <>
                    { errorValue.laptopImgError ? <div>
                        <img src={imgerr} className="mobile-err"></img> 
                        <img src={bigErr} className="desktop-err"></img>
                    </div>

                    :  
                        <div>
                            <img src={upload} className={dragActive ? 'upload-photo photo-active mobile-upload' : 'upload-photo mobile-upload' }></img>
                            <img src={upld} className={dragActive ? 'upload-photo photo-active desktop-upload' : 'upload-photo desktop-upload' }></img>
                        </div> 
                    }
                    
                        <img src={camera} className="camera-img mobile-camera-img"></img>
                        <label className={errorValue.laptopImgError ? "upload-text upload-err mobile-error-txt" : "upload-text mobile-txt"} htmlFor='fileUpload'>ლეპტოპის ფოტოს ატვირთვა</label>\
                        <label className={errorValue.laptopImgError ? "upload-text upload-err desktop-error-txt" : "upload-text desktop-txt"} htmlFor='fileUpload'>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</label>
                        <label className='upload-photo-desktop' htmlFor='fileUpload'>ატვირთე</label>
                        {errorValue.laptopImgError ? <img src={err} className="upload-err-img upload-mobile-err-img upload-desktop-err-img"></img> : null}
                </>
            }
        </div>
    
    </section>
  )
}

export default Laptop