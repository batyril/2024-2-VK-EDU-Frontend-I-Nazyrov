import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            setLocation(mapLink);
            setError(null);
            resolve(mapLink);
          },
          (error) => {
            setError(error.message);
            setLocation(null);
            reject(error.message);
          },
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLocation(null);
        reject('Geolocation is not supported by this browser.');
      }
    });
  };

  return { location, error, getLocation };
};

export default useGeolocation;
