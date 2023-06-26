import React from 'react';
import './Error.css';
import errorImage from '../../images/undraw_page_not_found_re_e9o6.svg';
import { Alert, Button } from 'react-bootstrap';

const Error = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  // const requestLocationAccess = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // Location access granted, do something with the position
  //         console.log('Latitude:', position.coords.latitude);
  //         console.log('Longitude:', position.coords.longitude);
  //       },
  //       (error) => {
  //         // Handle error or show error message
  //         console.log('Error occurred while retrieving location:', error);
  //         Alert('Error occurred while retrieving location');
  //       }
  //     );
  //   } else {
  //     // Geolocation is not supported by the browser
  //     console.log('Geolocation is not supported');
  //     Alert('Geolocation is not supported');
  //   }
  // };

  return (
    <div className="error">
      <img src={errorImage} alt="Error" />
      <h5>Please Enable Device Location</h5>
      <Button variant="primary" onClick={handleRetry}>Retry</Button>
    </div>
  );
};

export default Error;
