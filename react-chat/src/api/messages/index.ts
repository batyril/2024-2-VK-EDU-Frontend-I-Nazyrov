import { createUrl, ENDPOINTS } from '../../const/apiUrls.ts';
import axios from '../axiosConfig';
import getAccessToken from '../../helpers/getAccessToken.ts';

interface GetMessagesParams {
  chatId: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

interface SendMessageParams {
  chatId: string;
  text?: string | null;
  voice?: File | null;
  files?: File[];
}

export const messageService = () => {
  const getMessages = async ({
    chatId,
    search = '',
    page = 1,
    pageSize = 10,
  }: GetMessagesParams) => {
    const response = await axios.get(createUrl(ENDPOINTS.MESSAGES), {
      params: {
        chat: chatId,
        search: search,
        page: page,
        page_size: pageSize,
      },
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    return response.data;
  };

  const sendMessage = async ({
    chatId,
    text = null,
    voice = null,
    files = [],
  }: SendMessageParams) => {
    const formData = new FormData();
    formData.append('chat', chatId);

    if (voice) {
      formData.append('voice', voice);
    } else {
      if (text) formData.append('text', text);
      files.forEach((file) => formData.append(`files`, file));
    }

    const response = await axios.post(createUrl(ENDPOINTS.MESSAGES), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data;
  };

  return { sendMessage, getMessages };
};
