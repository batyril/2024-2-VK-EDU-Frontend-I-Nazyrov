import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

const updateUser = async ({ username, bio, first_name, last_name, id }) => {
  const accessToken = getAccessToken();

  const response = await axios.patch(
    createUrl(ENDPOINTS.USER(id)),
    {
      username,
      first_name,
      last_name,
      bio,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export default updateUser;
