import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const updateUser = async ({
  username,
  bio,
  first_name,
  last_name,
  id,
  avatar,
}) => {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.append('username', username);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('bio', bio);

  if (avatar && typeof avatar !== 'string') {
    formData.append('avatar', avatar);
  }

  const response = await axios.patch(createUrl(ENDPOINTS.USER(id)), formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default updateUser;
