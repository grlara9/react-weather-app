import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import Form from './components/form-weather.component'
import Weather from './components/display-weather.component'
import axios from 'axios';

const api_key="ce06c3f81e1990453b38833c502026cb";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      location:'',
      data:{},
      coord: {
        lat:'50',
        lon:'60'
      },
      icon:''
      
    }
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  
  }

  get_WeatherIcon =(icons, rangeId)=> {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position =>{
        
        var loc = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        this.setState({
          coord: loc 
        })
        const api =`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.coord.lat}&lon=${this.state.coord.lon}&appid=${api_key}`;
        axios.get(api)
        .then(response => {
          console.log(response)
          let weather ={
            city: response.data.name,
            country:response.data.sys.country,
            temperature: this.covertToFahrenheit(response.data.main.temp),
            max: this.covertToFahrenheit(response.data.main.temp_max),
            min:this.covertToFahrenheit(response.data.main.temp_min),
            condition: response.data.weather[0].description
            }
          this.setState({
           data: weather
          }) 
          // seting icons
          this.get_WeatherIcon(this.weatherIcon, response.data.weather[0].id);
        })
        .then(err => console.log(err))
      })
    }
  }
  convertKelvinToCelsius = (k) => {
    var celsius = Math.floor(k-273.15);
    return celsius;
  }
  covertToFahrenheit = (k) =>{
    var cel = k - 273;
    var far = Math.floor(cel * (9/5) + 32)
    return far;
  }

  onChange = (value) =>{
   this.setState({
     location:value
   })
  }

  getWeather = (e) => {
    e.preventDefault();

    const api=`http://api.openweathermap.org/data/2.5/weather?q=${this.state.location}&appid=${api_key}`;
    axios.get(api)
    .then(response=>{
   
    let weather= {
      city: response.data.name,
      country:response.data.sys.country,
      temperature: this.covertToFahrenheit(response.data.main.temp),
      max: this.covertToFahrenheit(response.data.main.temp_max),
      min:this.covertToFahrenheit(response.data.main.temp_min),
      condition: response.data.weather[0].description
    }
    this.setState({
      data:weather
    }) 
    // seting icons
    this.get_WeatherIcon(this.weatherIcon, response.data.weather[0].id);
  })
    .catch(err => {
   console.log(err)
 })
   
}



render(){
    return(
     <div className="container mt-5">

      <Form  getWeather={this.getWeather} onChange={this.onChange}/>
      <Weather weather={this.state.data} icon={this.state.icon}/>
    
     
      </div>
    )
  }
}

export default App;
