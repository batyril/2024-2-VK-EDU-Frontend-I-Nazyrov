import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const getMessages = async ({
  chatId,
  search = '',
  page = 1,
  pageSize = 10,
}) => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(createUrl(ENDPOINTS.MESSAGES), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        chat: chatId,
        search: search,
        page: page,
        page_size: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export default getMessages;
