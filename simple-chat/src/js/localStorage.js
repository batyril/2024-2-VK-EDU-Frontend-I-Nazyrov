import {
  generateUserId,
  getFromLocalStorage,
  getQueryParam,
  saveToLocalStorage,
} from './helper';

export const USER_KEY = 'userId';
export const MESSAGES_KEY = 'CHATS';

export const getChatByUserId = (userId) => {
  try {
    const userData = getFromLocalStorage(MESSAGES_KEY);
    const chat = userData.find((item) => item.userId === Number(userId));
    return chat || [];
  } catch (error) {
    console.error('Ошибка при получении сообщений из localStorage:', error);
    return [];
  }
};

export function addMessageToLocalStorage(message) {
  const userId = getQueryParam(USER_KEY);
  const usersData = getFromLocalStorage(MESSAGES_KEY);

  const userIndex = usersData.findIndex(
    (user) => user.userId === Number(userId),
  );

  if (userIndex !== -1) {
    usersData[userIndex].messages.push(message);
    saveToLocalStorage(MESSAGES_KEY, usersData);
  }
}

export const addUserToLocalStorage = (
  name,
  id = generateUserId(),
  messages = [],
) => {
  const usersData = getFromLocalStorage(MESSAGES_KEY);

  const user = {
    userId: id,
    name,
    messages,
  };

  usersData.push(user);

  saveToLocalStorage(MESSAGES_KEY, usersData);
  return user;
};
