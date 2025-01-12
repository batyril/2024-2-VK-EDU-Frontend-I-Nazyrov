import getAccessToken from './getAccessToken.ts';

const getHeaders = (contentType = 'application/json', token = false) => {
  return {
    'Content-Type': contentType,
    ...(token && { Authorization: `Bearer ${getAccessToken()}` }),
  };
};

export default getHeaders;
