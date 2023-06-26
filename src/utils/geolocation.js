const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser.'));
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  
  export default getCurrentPosition;
  