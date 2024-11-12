const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token not found');
  }

  return accessToken;
};

export default getAccessToken;
