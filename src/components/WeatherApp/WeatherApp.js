import React, { useEffect, useState, useRef } from 'react';
import Error from '../Error/Error';
import getCurrentPosition from '../../utils/geolocation';
import './WeatherApp.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import fetchWeatherData from '../../api/weatherAPI';
import { Bars } from 'react-loader-spinner';
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faLocationCrosshairs, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UnitSwitcher = ({ selectedUnit, onUnitChange }) => {
  const handleUnitChange = (event) => {
    const unit = event.target.value;
    onUnitChange(unit);
  };

  return (
    <div className="unit-switcher">
      <label>
        <input
          type="radio"
          name="unit"
          value="celsius"
          checked={selectedUnit === 'celsius'}
          onChange={handleUnitChange}
        />
        <span className={`unit-label ${selectedUnit === 'celsius' ? 'active' : ''}`}>°C</span>
      </label>
      <label>
        <input
          type="radio"
          name="unit"
          value="fahrenheit"
          checked={selectedUnit === 'fahrenheit'}
          onChange={handleUnitChange}
        />
        <span className={`unit-label ${selectedUnit === 'fahrenheit' ? 'active' : ''}`}>°F</span>
      </label>
    </div>
  );  
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('celsius');
  const searchInputRef = useRef(null);

  useEffect(() => {
    getWeatherDataByLocation();
  }, []);

  const getWeatherDataByLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
      setIsLoading(false);
      setSearchQuery('');
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const getWeatherDataByCity = async () => {
    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getWeatherDataByCity(searchQuery);
  };

  const handleSearchIconClick = () => {
    getWeatherDataByLocation();
  };

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handlePlaceSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      const { lat, lng } = latLng;
      const data = await fetchWeatherData(lat, lng);
      setWeatherData(data);
      setSearchQuery(address);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <Bars color="#00BFFF" height={80} width={80} />
        </div>
      </div>
    );
  }

  if (hasError) {
    return <Error />;
  }

  const temperatureInCelsius = weatherData.temperature - 273.15;
  const temperatureInFahrenheit = (weatherData.temperature - 273.15) * 9 / 5 + 32;

  const temperature = selectedUnit === 'celsius' ? temperatureInCelsius : temperatureInFahrenheit;

  // Map weather conditions to corresponding icons
  const getWeatherIcon = (conditions) => {
    switch (conditions) {
      case 'Clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'Clouds':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'Rain':
        return <FontAwesomeIcon icon={faCloudShowersHeavy} />;
      case 'Snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      default:
        return null; // No icon for other conditions
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-app-left">
        <div className='weather-app-title' onClick={handleSearchIconClick}>The Weather</div>
        <div className="left-bot">
          <div className="left-bot-temp">
            <p className="left-bot-temp-val">{temperature.toFixed(2)}°{selectedUnit === 'celsius' ? 'C' : 'F'}</p>
            <UnitSwitcher className="left-bot-temp-unit" selectedUnit={selectedUnit} onUnitChange={handleUnitChange} />
          </div>
          <div className="left-bot-loc">
            <p>{weatherData?.city}</p> 
            <p>{weatherData?.country}</p>
          </div>
          <div className="left-bot-con">
            <div className="weather-icon">{getWeatherIcon(weatherData?.conditions)}</div>
            <p>{weatherData?.conditions}</p>
          </div>
        </div>
      </div>
      
      <div className="weather-app-right">
        <div className="right-search-con">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <PlacesAutocomplete
            value={searchQuery}
            onChange={handleSearchInputChange}
            onSelect={handlePlaceSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <div className="right-search">
                  <input
                    {...getInputProps({ placeholder: 'Search Location' })}
                    ref={searchInputRef}
                  />
                  {searchQuery && (
                    <div className="search-clear-icon" onClick={handleClearSearch}>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  )}
                  <div className="search-icon" onClick={handleSearchIconClick}><FontAwesomeIcon icon={faLocationCrosshairs} /></div>
                </div>
                <div>
                  {loading ? <div className="search-load" >Loading...</div> : null}
                  {suggestions.map((suggestion, index) => {
                    const suggestionClasses = `suggestion-item ${suggestion.active ? 'active' : ''}`;
                    const { description, terms } = suggestion;
                    const city = terms[0].value;
                    const country = terms[terms.length - 1].value;
                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion)}
                        className={suggestionClasses}
                      >
                        {city}, {country}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </form>

        </div>
        <div className="right-details-con">
          <p className='right-details-title'>Weather Details</p>
          <div className="right-details">
            <p><h7>Temperature:</h7> {temperature.toFixed(2)}°{selectedUnit === 'celsius' ? 'C' : 'F'}</p>
            <p><h7>Conditions:</h7> {weatherData?.conditions}</p>
            <p><h7>Description:</h7> {weatherData?.description}</p>
            <p><h7>Humidity:</h7> {weatherData?.humidity}%</p>
            <p className="right-details-wind"><h7>Wind Speed:</h7> {weatherData?.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
