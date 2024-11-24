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
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('bio', bio);
  formData.append('avatar', avatar);

  const response = await axios.post(createUrl(ENDPOINTS.REGISTER), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default registerUser;
