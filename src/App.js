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
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder,setplaceholder] = useState('Search by city')

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.target.value="";
    e.preventDefault();
    
    setplaceholder(searchTerm);
    // Perform search logic here using the 'searchTerm' value
    console.log('Searching for:', searchTerm);
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
          width:"80%",
          padding: '0.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginRight: '0.5rem',
        }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '4px', background: 'rgb(72 72 72)', color: 'white', border: 'none' }}>
        Search
      </button>
    </form>
    <div className='result-page'></div>
    </div>
  );
}

export default App;
