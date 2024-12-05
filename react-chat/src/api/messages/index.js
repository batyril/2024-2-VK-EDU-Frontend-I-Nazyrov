import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import axios from '../axiosConfig.js';

export const messageService = () => {
  const getMessages = async ({
    chatId,
    search = '',
    page = 1,
    pageSize = 10,
  }) => {
    const response = await axios.get(createUrl(ENDPOINTS.MESSAGES), {
      params: {
        chat: chatId,
        search: search,
        page: page,
        page_size: pageSize,
      },
    });

    return response.data;
  };

  const sendMessage = async ({
    chatId,
    text = '',
    voice = null,
    files = [],
  }) => {
    const formData = new FormData();
    formData.append('chat', chatId);

    if (voice) {
      formData.append('voice', voice);
    } else {
      if (text) formData.append('text', text);
      files.forEach((file) => formData.append(`files`, file));
    }

    const response = await axios.post(createUrl(ENDPOINTS.MESSAGES), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  };

  return { sendMessage, getMessages };
};
