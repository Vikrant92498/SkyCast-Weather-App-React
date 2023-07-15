import React, { useEffect, useState } from 'react';
import './SmallBoxes.css';
import city from '../assests/icons/city.png'
const SmallBoxes = ({data}) => {
  return (
    <div className="small-boxes-container">
      <div className="small-box">
        <img src={city} alt="Icon" className="icon" />
        <p className="text">{data && data.name}</p>
      </div>
      <div className="small-box">
        
        <p className="text">Text 2 </p>
      </div>
      <div className="small-box">
        <img src="/path/to/icon.png" alt="Icon" className="icon" />
        <p className="text">Text 3</p>
      </div>
    </div>
  );
};

export default SmallBoxes;
