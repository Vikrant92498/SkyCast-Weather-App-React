import './App.css';
import WeatherWidget from './components/WeatherWidget';
import PredictionWidget from './components/PredictionWidget';
import React, { useState, useEffect } from 'react';
import timeConverter from './utils/DateTimeConversions';
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
  const [WeatherData,setWeatherData] =useState();
  const [isNotLoading,setNotLoading]=useState(true);
  const [ForeCastData,setForeCastData] =useState();
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    const apiKey = '6778f336382c3774112c0c4f6c32a647';
    setNotLoading(false);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lon } = data[0];  
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
        Promise.all([fetch(weatherUrl), fetch(forecastUrl)])
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((data) => {
            const [weather, forecast] = data;
            setWeatherData(weather);
            setForeCastData(forecast);
            setNotLoading(true);
          })
          .catch((error) => {
            console.log('Error fetching weather data', error);
            setNotLoading(false);
          });
      })
      .catch((error) => {
        console.log('Error fetching location data', error);
        setNotLoading(false);
      });
      
  };
  
  //Code to covert temperature from kelvin to celcius
  const kelvinToCelsius = (temp) => {
    return Math.round(temp - 273.15);
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
        placeholder="Search by City"
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
      <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: 'rgb(72 72 72)', color: 'white', border: 'none',cursor:'pointer' }}>
        Search
      </button>
    </form>
    {isNotLoading?
    (<div className='result-page'>
      {WeatherData? (
        <div className="weather">
          <div className="current-weather">
            <h3>CURRENT WEATHER</h3>
            <div className="info">
               <WeatherWidget icon={"city"} val={WeatherData.name}  />
               <WeatherWidget icon={WeatherData.weather[0].icon} val={WeatherData.weather[0].main}  />
               <WeatherWidget icon={"temperature"} val={kelvinToCelsius(WeatherData.main.temp)+"°C"} />
            </div>
            <h3 style={{borderTop:"1px solid gray"}}>AIR CONDITION</h3>
            <div className="info">
               <WeatherWidget icon={"feelLike"} val={"Feels Like: "+kelvinToCelsius(WeatherData.main.feels_like)+"°C"} />
               <WeatherWidget icon={"wind"} val={WeatherData.wind.speed +" m/s"} />
               <WeatherWidget icon={"humidity"} val={WeatherData.main.humidity+"%"} />
            </div>
          </div>
          <div className="atmosphere">
            <h3>SKY OVERVIEW</h3>
            <div className="info">
               <WeatherWidget icon={'04d'} val={"Clouds:"+WeatherData.clouds.all+" %"}  />
               <WeatherWidget icon={"visibility"} val={"Visibilty: "+WeatherData.visibility+" meters"}  />
            </div>
            <div className="info">
               <WeatherWidget icon={"sunrise"} val={"Sunrise : "+timeConverter(WeatherData.sys.sunrise)}  />
               <WeatherWidget icon={"sunset"} val={"Sunset : "+timeConverter(WeatherData.sys.sunset)}  />
            </div>
          </div>
        </div>
      ) : (
        <div className="weather" style={{fontSize:"2rem" ,margin:"auto"}}>Search the weather of city</div>
      )}
      {ForeCastData? (
      <div className="forecast">
          <h3>PREDICTIONS</h3>
          {ForeCastData.list.map((item) => (
          <div key={item.dt} className="forecast-item">
            <PredictionWidget prediction={item}/>
          </div>
        ))}
      </div>
      ):(<></>)}
    </div>
    ):(<div style={{fontSize:"2rem" ,margin:"auto"}}>Loading...</div>)}
    </div>
  );
}

export default App;
