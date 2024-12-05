import axios from '../axiosConfig.js';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const centrifugoService = () => {
  const getSubscribeToken = async (userId) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_SUBSCRIBE),
      { userId },
      { headers: { Authorization: `Bearer ${getAccessToken()}` } },
    );
    return response.data.token;
  };

  const getToken = async () => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_CONNECT),
      {},
      { headers: { Authorization: `Bearer ${getAccessToken()}` } },
    );
    return response.data.token;
  };

  return { getSubscribeToken, getToken };
};

export default centrifugoService;
