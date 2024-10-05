import { getQueryParam } from './helper';

export const USER_KEY = 'userId';

export const getMessagesFromLocalStorage = (userId) => {
  try {
    const storedMessages = JSON.parse(localStorage.getItem(userId));
    return storedMessages || [];
  } catch (error) {
    console.error('Ошибка при получении сообщений из localStorage:', error);
    return [];
  }
};

export function addMessageToLocalStorage(message) {
  const userId = getQueryParam(USER_KEY);
  const userData = getMessagesFromLocalStorage(userId);

  userData.messages.push(message);

  localStorage.setItem(userId, JSON.stringify(userData));
}

function saveMockUserData(userId, userName, messages) {
  const userData = {
    name: userName,
    messages,
  };
  localStorage.setItem(userId, JSON.stringify(userData));
}

export function setDefaultMessages() {
  const hasLocalStorageData = localStorage.length > 0;

  if (!hasLocalStorageData) {
    saveMockUserData(1, 'Покемон', [
      {
        name: 'Покемон',
        text: 'Привет! Как дела?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Привет! Нормально, только устала после работы. А у тебя?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'Покемон',
        text: 'Тоже ничего, только приехала с дачи. У вас есть планы на вечер?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Да, собираюсь сходить в кино с подругой. А ты?',
        time: '2024-09-25T11:50:01.205Z',
      },
    ]);
    saveMockUserData(2, 'Шарик', [
      {
        name: 'Шарик',
        text: 'Привет! Слышал, ты уволился с работы?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Привет! Да, свалил оттуда, как от чумы. Работал там просто невыносимо.',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'Шарик',
        text: 'А что дальше? Уже нашел новую?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Пока нет, но уже активно ищу. Надеюсь, что-нибудь подвернется.',
        time: '2024-09-25T11:50:01.205Z',
      },
    ]);
    saveMockUserData(3, 'Биби', [
      {
        name: 'Биби',
        text: 'Привет! Как успехи с йогой?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Привет! Спасибо, что спросила! Занимаюсь уже месяц, чувствую себя намного лучше.',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'Биби',
        text: 'Это здорово! А какой тебе стиль больше всего нравится?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Мне очень нравится хатха-йога. Она помогает расслабиться и настроиться на позитив.',
        time: '2024-09-25T11:50:01.205Z',
      },
    ]);
  }
}
