import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getHeaders from '../../helpers/getHeaders.js';

export const chatService = () => {
  const createChat = async ({ members, isPrivate, title, avatar }) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CHATS),
      {
        members: members,
        is_private: isPrivate,
        // avatar: avatar,
      },
      {
        headers: getHeaders('application/json', true),
      },
    );

    return response.data;
  };
  const getChatById = async ({ chatId, accessToken }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CHAT(chatId)), {
      headers: getHeaders('application/json', accessToken),
    });

    return response.data;
  };
  const getChats = async ({
    page = 1,
    page_size = 10,
    search = '',
    accessToken,
  }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CHATS), {
      headers: getHeaders('application/json', accessToken),
      params: {
        page,
        page_size,
        search,
      },
    });

    return response.data;
  };

  return { createChat, getChats, getChatById };
};

export default chatService;
