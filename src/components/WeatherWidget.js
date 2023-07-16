import React, { useEffect, useState } from 'react';
import './css/WeatherWidget.css';
import getIconFromCode from '../utils/GetIconFromCode'
const WeatherWidget = ({icon,val}) => {
  const [Icon,setIcon] = useState();
  useEffect(()=>{
    const fetchedIcon = getIconFromCode(icon);
    setIcon(fetchedIcon);
  },[icon]);
  return (
    
      <div className="small-box">
        <img src={Icon} alt="Icon" className="icon" />
        <p className="text">{val}</p>
      </div>
  );
};

export default WeatherWidget;
