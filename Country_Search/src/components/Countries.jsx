    import { useState, useEffect } from "react";
    import React from "react";
    import weatherService from "../services/weather"

    const Countries = ({countries, search}) => {
    //if input value matches > 10 countries --> return ('Refine Search)
    //if input value matches < 10 countries but > 1 --> return ([List of matching country names])
    //if input value matches 1 country --> return {full country data}

        const [showCountryInfo, setShowCountryInfo] = useState({})
        const [weatherData, setWeatherData] = useState({})

        
        const filteredCountries = countries.filter(country => 
            country.name.common && country.name.common.toLowerCase().includes(search.toLowerCase())
        )

        const flagStyle = {
            borderStyle: 'solid',
        }
        
        const toggleShowCountryInfo = (countryName) => {
            setShowCountryInfo(prevState => ({
                ...prevState,
                [countryName]: !prevState[countryName]
            }))
        }

        useEffect(() => {
            filteredCountries.forEach(country => {
                if (showCountryInfo[country.name.common] && !weatherData[country.name.common]) {
                    weatherService
                        .currentWeather(country.capital)
                        .then(weather => {
                            setWeatherData(prevState => ({
                                ...prevState,
                                [country.name.common]: weather
                            }))
                            // console.log(weather)
                        })
                        .catch(err => {
                            console.error('Error fetching weather data', err)
                        })
                }    
            });
        }, [setShowCountryInfo, filteredCountries, weatherData]);


    if (filteredCountries.length > 10 ) {
        return(
        <>
        <p>Please refine your search...</p>
        </>)
        }
    if (filteredCountries.length === 1) {
        const country = filteredCountries[0]

        return (   
            <>
            {filteredCountries.map(country =>   
            <div>
                <h3>{country.name.common}</h3>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}
                    style={flagStyle}/>
                    <h3>Weather in {country.capital}</h3>
                    {weatherData[country.name.common] ? (
                        <div>
                        <p>Temperature: {weatherData[country.name.common].current.temperature}°C</p>
                        <p>Weather:{weatherData[country.name.common].current.weather_descriptions[0]}</p>
                        <img src={weatherData[country.name.common].current.weather_icons[0]} alt="Weather Icon" />
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
            )}
            </>
        )
    }
        return (
        <>
            {filteredCountries.map(country =>
            <>
            <div key={country.name.offcial}>
                <p showcountryinfo='false'>
                {country.name.common}
                </p>    
                <button onClick={() => toggleShowCountryInfo(country.name.common)}>
                    {showCountryInfo[country.name.common] ? 'Hide' : 'Show'} Country Info
                </button>
                {showCountryInfo[country.name.common] && (
                    <div>
                                    <h3>{country.name.common}</h3>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map(language =>
                        <li>{language}</li>
                    )}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}
                    style={flagStyle}/>
                <h4>Weather in {country.capital}</h4>
                    { weatherData[country.name.common] ? (
                        console.log(weatherData[country.name.common].current.temperature),
                        
                        <div>
                            <p>Temperature: {weatherData[country.name.common].current.temperature}°C</p>
                            <p>Weather:{weatherData[country.name.common].current.weather_descriptions[0]}</p>
                            <img src={weatherData[country.name.common].current.weather_icons[0]} alt="Weather Icon" />
                        </div>
                    ) : (
                        <p>Loading weather data...</p>
                    )
                    }
                </div>
                )}
            </div>
            </> 
            )}
        </>
        )
        }

    export default Countries