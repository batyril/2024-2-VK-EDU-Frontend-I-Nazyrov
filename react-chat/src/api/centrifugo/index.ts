import axios from '../axiosConfig';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.ts';
import getAccessToken from '../../helpers/getAccessToken.ts';

const centrifugoService = () => {
  const getSubscribeToken = async (userId: string) => {
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
