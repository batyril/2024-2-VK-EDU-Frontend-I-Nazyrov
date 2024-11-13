import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';

const registerUser = async ({
  username,
  password,
  first_name,
  last_name,
  bio,
  avatar,
}) => {
  const response = await axios.post(
    createUrl(ENDPOINTS.REGISTER),
    {
      username,
      password,
      first_name,
      last_name,
      bio,
      avatar,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );
  return response.data;
};
export default registerUser;
