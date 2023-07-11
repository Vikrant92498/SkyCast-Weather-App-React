import './App.css';
import React, { useState, useEffect } from 'react';
function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today_Date = currentTime.toLocaleDateString('en-US', options);
  const current_Time = currentTime.toLocaleTimeString('en-US');

  return (
    <div className="App">
      <header className="App-header">
        <div className='app-logo'>SkyCast</div>
        <div className='today'>
          <div className="day">{today_Date}</div>
          <div className="time">{current_Time}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
