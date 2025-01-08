import { createUrl, ENDPOINTS } from '../../const/apiUrls.ts';
import axios from '../axiosConfig';
import getAccessToken from '../../helpers/getAccessToken.ts';
export const chatService = () => {
  const createChat = async ({
    members,
    isPrivate,
  }: {
    members: string[];
    isPrivate: boolean;
  }) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.CHATS),
      {
        members: members,
        is_private: isPrivate,
      },
      { headers: { Authorization: `Bearer ${getAccessToken()}` } },
    );

    return response.data;
  };
  const getChatById = async ({ chatId }: { chatId: string }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CHAT(chatId)), {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

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
