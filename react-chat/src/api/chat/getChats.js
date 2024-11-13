import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const getChats = async ({ page = 1, page_size = 10, search = '' }) => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(createUrl(ENDPOINTS.CHATS), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        page_size,
        search,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

export default getChats;
