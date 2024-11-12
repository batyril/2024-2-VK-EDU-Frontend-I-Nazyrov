import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

export const getCentrifugoToken = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_CONNECT),
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.token;
  } catch (error) {
    console.error('Error fetching Centrifugo connect token:', error);
    throw new Error('Failed to fetch Centrifugo connect token');
  }
};

export const getSubscribeToken = async (userId) => {
  const accessToken = getAccessToken();
  try {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_SUBSCRIBE),
      { userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.token;
  } catch (error) {
    console.error('Error fetching Centrifugo subscribe token:', error);
    throw new Error('Failed to fetch Centrifugo subscribe token');
  }
};
