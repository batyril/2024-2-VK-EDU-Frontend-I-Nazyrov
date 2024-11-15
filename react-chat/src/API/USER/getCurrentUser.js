import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const getCurrentUser = async () => {
  const accessToken = getAccessToken();

  try {
    const response = await axios.get(createUrl(ENDPOINTS.CURRENT_USER), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

export default getCurrentUser;
