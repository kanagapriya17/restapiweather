import React from 'react'
import "../Components/Current.css"

function Current({current,city}) {
  return (
    <div className='current'>
  <b>{city} &nbsp;weather</b>
  <div className='currentBody'>
    <img src={current.condition.icon}/>
    <span>{current.condition.text}</span>
    <span><b>Temp:</b>{current.temp_c}deg</span>
    <span><b>Feels like</b>{current.feelslike_c}deg</span>
    <span><b>wind speens</b>{current.wind_kph}deg</span>
  </div>
    </div>
  )
}

export default Current

