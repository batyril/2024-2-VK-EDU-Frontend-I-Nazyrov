import axios from 'axios';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getHeaders from '../../helpers/getHeaders.js';

export const userService = () => {
  const authUser = async ({ username, password }) => {
    const response = await axios.post(
      createUrl(ENDPOINTS.AUTH),
      {
        username,
        password,
      },
      {
        headers: getHeaders(),
      },
    );
    return response.data;
  };

  const getAllUsers = async ({
    page = 1,
    page_size = 10,
    search = '',
    accessToken,
  }) => {
    const response = await axios.get(createUrl(ENDPOINTS.USERS), {
      headers: getHeaders('application/json', accessToken),
      params: {
        page,
        page_size,
        search,
      },
    });

    return response.data;
  };

  const getCurrentUser = async ({ accessToken }) => {
    const response = await axios.get(createUrl(ENDPOINTS.CURRENT_USER), {
      headers: getHeaders('application/json', accessToken),
    });

    return response.data;
  };

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
      headers: getHeaders('application/json'),
    });
    return response.data;
  };

  const updateUser = async ({
    username,
    bio,
    first_name,
    last_name,
    id,
    avatar,
    accessToken,
  }) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('bio', bio);

    if (avatar && typeof avatar !== 'string') {
      formData.append('avatar', avatar);
    }

    const response = await axios.patch(
      createUrl(ENDPOINTS.USER(id)),
      formData,
      {
        headers: getHeaders('multipart/form-data', accessToken),
      },
    );
    return response.data;
  };

  return { authUser, getAllUsers, getCurrentUser, registerUser, updateUser };
};
