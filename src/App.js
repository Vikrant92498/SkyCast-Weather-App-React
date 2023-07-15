import './App.css';
import SmallBoxes from './components/Smallboxes';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder,setplaceholder] = useState('Search by city')
  const[loading ,isLoading] = useState(false);
  const [humidity,sethumidity] = useState('');
  const [temp,setTemp] = useState('')
  const [data,setData] =useState();
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.target.value="";
    e.preventDefault();
    
    setplaceholder(searchTerm);
    // Perform search logic here using the 'searchTerm' value
    const link="https://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid=6778f336382c3774112c0c4f6c32a647";
    fetch(link)
    .then(response=>response.json()).then((data)=>{
      setData(data);
      console.log(data)
    })
    
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='app-logo'>SkyCast</div>
        <div className='today'>
          <div className="day">{today_Date}</div>
          <div className="time">{current_Time}</div>
        </div>
      </header>
      <form onSubmit={handleSearch} style={{ display: 'flex',justifyContent:'center',margin:'7px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={{
          width:"60%",
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginRight: '0.5rem',
          outlineWidth:"0"
        }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: 'rgb(72 72 72)', color: 'white', border: 'none' }}>
        Search
      </button>
    </form>
    <div className='result-page'>
      {data? (
        <div className="weather">
          <div className="current-weather">
            <h3>CURRENT WEATHER</h3>
            <SmallBoxes data={data}/>
  
          </div>
          <div className="atmosphere">
            <h3>ATMOSPHERE</h3>
          </div>
        </div>
      ) : (
        <div className="weather">Search the weather of city</div>
      )}
      <div className="forecast">
          <h3>PREDICTIONS</h3>
      </div>
    </div>
    </div>
  );
}

export default App;
