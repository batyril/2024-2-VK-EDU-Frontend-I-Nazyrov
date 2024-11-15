import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const createChat = async ({ members, isPrivate, title, avatar }) => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.post(
      createUrl(ENDPOINTS.CHATS),
      {
        members: members,
        is_private: isPrivate,
        // avatar: avatar,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error creating group chat:', error);
    throw error;
  }
};

export default createChat;
