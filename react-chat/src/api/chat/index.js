import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import axios from '../axiosConfig.js';
import getAccessToken from '../../helpers/getAccessToken.js';
export const chatService = () => {
  const createChat = async ({ members, isPrivate, title, avatar }) => {
    const response = await axios.post(createUrl(ENDPOINTS.CHATS), {
      members: members,
      is_private: isPrivate,
      // avatar: avatar,
    });

    return response.data;
  };
  const getChatById = async ({ chatId }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CHAT(chatId)));

    return response.data;
  };
  const getChats = async ({ page = 1, page_size = 10, search = '' }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CHATS), {
      params: {
        page,
        page_size,
        search,
      },
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    return response.data;
  };

  return { createChat, getChats, getChatById };
};

export default chatService;
