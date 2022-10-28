
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Current from './Components/Current';
const autoCompleteURL="https://api.weatherapi.com/v1/search.json?key=32ed33b63c7f4ed1b8151355222810&q=";
const weatherURL=(city)=>`https://api.weatherapi.com/v1/forecast.json?key=32ed33b63c7f4ed1b8151355222810&q=${city}&days=7&aqi=no&alerts=no`;

function App() {
  const [city,setCity] = useState("")
  const[citySuggestion,setCitySuggestion]=useState([]);
  const [clicked, setClicked] = useState(false)
  const[current,setCurrent]=useState();


  const handleClick=async(clickedCity)=>{
    setCity(clickedCity);
    setClicked(true);
    const resp=await fetch(weatherURL(city));
    const data=await resp.json();
    setCurrent(data.current);
    

  }


  useEffect(()=>{
const fetchCitySuggestion= async ()=>{
const resp=await fetch(autoCompleteURL+city);
const data=await resp.json();
const citySuggestionData=data.map((curData)=> `${curData.name}, ${curData.region}, ${curData.country}`
);
setCitySuggestion(citySuggestionData);
};
if (!clicked && city.length>2){
fetchCitySuggestion();
}
else{
  setCitySuggestion([]);
  setClicked(false);

}
  },[city]);
  return (
    <div classname="App">
      <div className="header"> <b>Clarit Weather Report</b></div>
      <div className="App-body">
        <input type="text" className="citytextbox" placeholder='Enter the city name'value={city} onChange={event=>setCity(event.target.value)}/>



        {citySuggestion.length > 0 && (
        <div className='suggestionWrapper'>
      {citySuggestion.map((curCity)=>(
        <div className="suggestion" onClick={()=> handleClick(curCity)}>
          {curCity}
          </div>
     
          ))}
          </div>
        )}
         {current && <Current current={current} city={city}/>} 
      </div>

    </div>
  );
}

export default App;
 