import axios from '../axiosConfig.js';
import { createUrl, ENDPOINTS } from '../../const/apiUrls.ts';
import getAccessToken from '../../helpers/getAccessToken.ts';

interface AuthUserParams {
  username: string;
  password: string;
}

interface UpdateOldTokenParams {
  refresh_token: string;
}

interface RegisterUserParams {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  bio: string;
  avatar: File | string;
}

export interface UpdateUserParams {
  username: string;
  first_name: string;
  last_name: string;
  bio: string;
  id: string;
  avatar: File | string;
}

export const userService = () => {
  const authUser = async ({ username, password }: AuthUserParams) => {
    const response = await axios.post(createUrl(ENDPOINTS.AUTH), {
      username,
      password,
    });
    return response.data;
  };

  const updateOldToken = async ({ refresh_token }: UpdateOldTokenParams) => {
    const response = await axios.post(createUrl(ENDPOINTS.REFRESH), {
      refresh: refresh_token,
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
  }: RegisterUserParams) => {
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
  }: UpdateUserParams) => {
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

  return {
    authUser,
    getAllUsers,
    getCurrentUser,
    registerUser,
    updateUser,
    updateOldToken,
  };
};
