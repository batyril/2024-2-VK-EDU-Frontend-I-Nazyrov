export const ENDPOINTS = {
  REGISTER: '/api/register/',
  AUTH: '/api/auth/',
  CURRENT_USER: '/api/user/current/',
  USERS: '/api/users/',
  USER: (id) => `/api/user/${id}`,
  MESSAGES: '/api/messages/',
  CHATS: '/api/chats/',
  CHAT: (id) => `/api/chat/${id}`,
  CENTRIFUGO_CONNECT: '/api/centrifugo/connect/',
  CENTRIFUGO_SUBSCRIBE: '/api/centrifugo/subscribe/',
};

export const createUrl = (
  endpoint,
  BASE_URL = 'https://vkedu-fullstack-div2.ru',
) => {
  const url = new URL(endpoint, BASE_URL);
  return url.toString();
};
