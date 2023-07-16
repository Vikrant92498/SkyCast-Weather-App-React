import React, { useEffect, useState } from 'react';
import './css/PredictionWidget.css';
import getIconFromCode from '../utils/GetIconFromCode'
const PredictionWidget = ({prediction}) => {
  const [Icon,setIcon] = useState();
  const [time,setTime] = useState("--");
   // eslint-disable-next-line
  useEffect(()=>{
    //Extract icon code from json
    const iconCode = prediction.weather[0].icon;
    const fetchedIcon = getIconFromCode(iconCode);
    setIcon(fetchedIcon)
    const dateTimeString = prediction.dt_txt;
     // eslint-disable-next-line
    const [date, time] = dateTimeString.split(" ");
    const trimmedTime = time.substring(0, 5);
    setTime(trimmedTime);
  },[prediction.dt_txt,prediction.weather]);


  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  };
  
 
  
  return (
    
      <div className="container">
        <div className="widget">
            <div className="at">
                <span style={{fontSize:"0.7rem"}}>{getDayOfWeek(prediction.dt_txt)}</span>
                <span style={{fontSize:"0.7rem" }}> at {time}</span>
            </div>
            <img src={Icon} alt="img" className='icon' />
            
        </div>
        <div className="widget status">
            <div className="temp">
                <img src={getIconFromCode("humidity")} alt="img" className='icon' />
                <span style={{position:"absolute" , top:2,fontSize:"0.8rem",left:37}}>{prediction.main.humidity+" %"}</span>
            </div>
            <div className="temp">
                <img src={getIconFromCode("temperature")} alt="img" className='icon' />
                <span style={{position:"absolute" , top:32,fontSize:"0.8rem",left:37}}>{prediction.main.temp +"°C"}</span>
            </div>
        </div>
        <div className="widget status">
            <div className="temp">
                    <img src={getIconFromCode("wind")} alt="img" className='icon' />
                    <span style={{position:"absolute" , top:2,fontSize:"0.8rem",left:37}}>{prediction.wind.speed+" m/s"}</span>
                </div>
                <div className="temp">
                    <img src={getIconFromCode('04d')} alt="img" className='icon' />
                    <span style={{position:"absolute" , top:32,fontSize:"0.8rem",left:37}}>{prediction.clouds.all +"%"}</span>
            </div>
        </div>
      </div>
  );
};

export default PredictionWidget;
