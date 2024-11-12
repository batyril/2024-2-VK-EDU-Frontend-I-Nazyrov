import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const getChatById = async (chatId) => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(createUrl(ENDPOINTS.CHAT(chatId)), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chat:', error);
    throw error;
  }
};

export default getChatById;
