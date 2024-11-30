import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getHeaders from '../../helpers/getHeaders.js';

const centrifugoService = () => {
  const getSubscribeToken = async (userId, accessToken) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_SUBSCRIBE),
      { userId },
      {
        headers: getHeaders('application/json', accessToken),
      },
    );
    return response.data.token;
  };

  const getToken = async (accessToken) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_CONNECT),
      {},
      {
        headers: getHeaders('application/json', accessToken),
      },
    );
    return response.data.token;
  };

  return { getSubscribeToken, getToken };
};

export default centrifugoService;
