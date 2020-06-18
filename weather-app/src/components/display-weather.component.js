import React from 'react';

const Weather =(props)=>{ 
    return (
        <div>
            <div className="name">
        {props.weather.city},{props.weather.country}
    </div>
    <div className="weather-icon">
        <i className={`wi ${props.icon}`}/>
    </div>
    <div className="weather">
        <div className="main-weather">
            <span className="temperature">{props.weather.temperature}<i className="wi wi-celsius"/> </span>
        </div>
        <div className="minmax">
            <span className="min-max">Min {props.weather.min}<i className="wi wi-celsius"/><br/>Max {props.weather.max}<i className="wi wi-celsius"/></span>
        </div>
    </div>
    
    <div className="condition">
            {props.weather.condition}
    </div>
        </div>
    
    
)
}
export default Weather;
