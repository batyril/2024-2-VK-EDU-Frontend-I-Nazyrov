import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const sendMessage = async ({ chatId, text = '', voice = null, files = [] }) => {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.append('chat', chatId);

  if (voice) {
    formData.append('voice', voice);
  } else {
    if (text) formData.append('text', text);
    files.forEach((file) => formData.append(`files`, file));
  }

  try {
    const response = await axios.post(createUrl(ENDPOINTS.MESSAGES), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export default sendMessage;
