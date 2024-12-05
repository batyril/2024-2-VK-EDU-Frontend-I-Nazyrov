import axios from '../axiosConfig.js';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.js';
import getAccessToken from '../../helpers/getAccessToken.js';

export const userService = () => {
  const authUser = async ({ username, password }) => {
    const response = await axios.post(createUrl(ENDPOINTS.AUTH), {
      username,
      password,
    });
    return response.data;
  };

  const getAllUsers = async ({ page = 1, page_size = 10, search = '' }) => {
    const response = await axios.get(createUrl(ENDPOINTS.USERS), {
      params: {
        page,
        page_size,
        search,
      },
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

    return response.data;
  };

  const getCurrentUser = async () => {
    const response = await axios.get(createUrl(ENDPOINTS.CURRENT_USER), {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
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
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    return response.data;
  };

  return { authUser, getAllUsers, getCurrentUser, registerUser, updateUser };
};
