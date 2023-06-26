// import React from 'react';
// import './WeatherData.css';

// const WeatherData = ({ data, unit }) => {
//   const temperatureInCelsius = data.temperature - 273.15;
//   const temperatureInFahrenheit = (data.temperature - 273.15) * 9 / 5 + 32;

//   const temperature = unit === 'celsius' ? temperatureInCelsius : temperatureInFahrenheit;

//   return (
//     <div className="weather-data">
//       <h2>Weather Data</h2>
//       <p>Temperature: {temperature.toFixed(2)}°{unit === 'celsius' ? 'C' : 'F'}</p>
//       <p>Conditions: {data?.conditions}</p>
//       <p>Description: {data?.description}</p>
//       <p>Humidity: {data?.humidity}%</p>
//       <p>Wind Speed: {data?.windSpeed} km/h</p>
//     </div>
//   );
// };

// export default WeatherData;


return (
    <div className="weather-app">
      <div className="location">
        <h2>Current Location</h2>
        <p>{weatherData?.city}, {weatherData?.country}</p>
      </div>      
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <PlacesAutocomplete
          value={searchQuery}
          onChange={handleSearchInputChange}
          onSelect={handlePlaceSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({ placeholder: 'Enter a city' })}
                ref={searchInputRef}
              />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                  };
                  const { description, terms } = suggestion;
                  const city = terms[0].value;
                  const country = terms[terms.length - 1].value;
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {city}, {country}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </form>
      <button className="current-location-button" onClick={getWeatherDataByLocation}>
        Get Current Location Weather
      </button>
      <div className="weather-data">
        <h2>Weather Data</h2>
        <p>Temperature: {temperature.toFixed(2)}°{selectedUnit === 'celsius' ? 'C' : 'F'}</p>
        <p>Conditions: {weatherData?.conditions}</p>
        <p>Description: {weatherData?.description}</p>
        <p>Humidity: {weatherData?.humidity}%</p>
        <p>Wind Speed: {weatherData?.windSpeed} km/h</p>
      </div>
      <UnitSwitcher selectedUnit={selectedUnit} onUnitChange={handleUnitChange} />
    </div>
  );



