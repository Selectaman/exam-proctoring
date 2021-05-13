import { Button } from '@material-ui/core';
import React from 'react'
import Webcam from "react-webcam";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
const ValidatePage = () => {

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }
  // document.addEventListener("visibilitychange", handleVisibilityChange, false);
  //for capturing image
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const capture = React.useCallback(() => {
  const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    sessionStorage.setItem("imageSrc", imageSrc);
  }, [webcamRef, setImgSrc]);
  
  //image as base64
  console.log(imgSrc);
 

  const history = useHistory();
  var elem = document.documentElement;

  /* View in fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
      history.push("/instructions")
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
      history.push("/instructions")
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
      history.push("/instructions")
    }
  }
  function handleClick() {
  history.push("/systemcheck");
  }
  return (<div className="App-header">
    <center>
    </center>
    <br></br>
      <p align ="center"><b>Instructions to Follow:</b></p>
      <li align = "center"><strong>The lighting in the room must be bright enough to be considered “daylight” quality. Overhead lighting is preferred. </strong></li>
      
      <li align ="left"><strong>If overhead lighting is not available, the source of light must not be behind you.</strong></li>
      <center>
      <br></br>
       <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      /> 
      <br/>
      <br/>
     <center><Button variant="contained" onClick={capture}>Capture photo</Button></center>
      {imgSrc && (
        <img
          src={imgSrc}
        /> 
      )} 
      
      <br/>
      <br/>
      
      <center><Button variant="contained" onClick={handleClick}>Confirm Validation</Button></center>


    </center>

    
   
  </div>
  )
}

export default ValidatePage;