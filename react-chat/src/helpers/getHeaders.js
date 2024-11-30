const getHeaders = (contentType = 'application/json', accessToken = false) => {
  return {
    'Content-Type': contentType,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

export default getHeaders;
