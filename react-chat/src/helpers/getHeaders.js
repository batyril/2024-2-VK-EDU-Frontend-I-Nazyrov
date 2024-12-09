import getAccessToken from './getAccessToken.js';

const getHeaders = (contentType = 'application/json', token = false) => {
  return {
    'Content-Type': contentType,
    ...(token && { Authorization: `Bearer ${getAccessToken()}` }),
  };
};

export default getHeaders;
