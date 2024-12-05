import axios from '../axiosConfig.js';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';

const centrifugoService = () => {
  const getSubscribeToken = async (userId) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CENTRIFUGO_SUBSCRIBE),
      { userId },
    );
    return response.data.token;
  };

  const getToken = async () => {
    const response = await axios.post(createUrl(ENDPOINTS.CENTRIFUGO_CONNECT));
    return response.data.token;
  };

  return { getSubscribeToken, getToken };
};

export default centrifugoService;
