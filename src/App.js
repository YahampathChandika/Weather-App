import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import WeatherApp from './components/WeatherApp/WeatherApp';
import { Bars } from 'react-loader-spinner';
import Error from './components/Error/Error';
import './App.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulating API call and data retrieval
    setTimeout(() => {
      setIsLoading(false);
    }, 20);
  }, []);

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
    return <Error />  
  }

  return (
    <div className="app">
      <WeatherApp />
    </div>
  );
};

export default App;
