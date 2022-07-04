import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [weather, setWeather] = useState("");
    const [temp, setTemp] = useState(0);
    const [isConvert, setIsConvert] = useState(true);

    useEffect(() => {
        function success(pos) {
            const crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8cbae50ec5be185dcf5b9ed22414db5d`)
                .then(res => {
                    setWeather(res.data)
                    setTemp(res.data.main.temp)
                });

        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, [])
    console.log(weather)
    console.log(temp)


    
    const convertToCelsius = (kelvin) => kelvin - 273.15;   // Convertir los datos de la api (kelvin a Celsius)
    const convertToFahrenheit = () => (weather.main?.temp - 273.15) * (9 / 5) + 32;     // Convertir de kelvin a Fahrenheit



     // Fondo de acuerdo a la temperatura, Si la temperatura es mayor que 16 ° se activa el fondo de nubes claras, si no se activa el fondo de nubes oscuras
    if (convertToCelsius(temp) > 16) {
        document.body.style.background = " url('https://images8.alphacoders.com/805/thumb-1920-805636.jpg')  ";
    } else {
        document.body.style.background = " url('https://images3.alphacoders.com/105/thumb-1920-1050171.jpg') no-repeat ";
    }


    return (
        <div className='Card'>
            <div>
                <h1>Weather App</h1>
            </div>

            <div>
                <p><b>{weather.name + ","} {weather.sys?.country}</b></p>
            </div>

            <div className='date_weather'>
                <div>
                    <img className='Icon_weather' src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                </div>
                <div className='date'>
                    <p>"{weather.weather?.[0].description}"</p>
                    <p> <i className="fa-solid fa-wind"></i>Wind speed: {weather.wind?.speed} m/s</p>
                    <p><i className="fa-solid fa-cloud"></i> Humidity: {weather.main?.humidity}%</p>
                    <p><i className="fa-solid fa-temperature-three-quarters"></i> Pressure: {weather.main?.pressure}mb</p>
                </div>

            </div>
            <div>
                <p>{isConvert ? `${(convertToCelsius(temp)).toFixed(2)} Celsius` : `${(convertToFahrenheit()).toFixed(2)} Fahrenheit`}</p>
                <button className='button' onClick={() => setIsConvert(!isConvert)}>°F/°C</button>
            </div>
        </div>
    );
};

export default Weather;