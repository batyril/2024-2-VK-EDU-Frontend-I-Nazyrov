import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';

const authUser = async ({ username, password }) => {
  const response = await axios.post(
    createUrl(ENDPOINTS.AUTH),
    {
      username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export default authUser;
