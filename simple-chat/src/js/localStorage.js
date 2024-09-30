const MESSAGES_KEY = 'messages';

export const getMessagesFromLocalStorage = () => {
  try {
    const storedMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY));

    return storedMessages || [];
  } catch (error) {
    console.error('Ошибка при получении сообщений из localStorage:', error);
    return [];
  }
};

export function addMessageToLocalStorage(message) {
  try {
    const messages = getMessagesFromLocalStorage();

    messages.push(message);

    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Ошибка при работе с localStorage: ', error);
  }
}

export function setDefaultMessages() {
  const storedMessages = localStorage.getItem(MESSAGES_KEY);
  if (!storedMessages) {
    addMessageToLocalStorage({
      name: 'Ярослав',
      text: 'Привет! Расскажи о себе?',
      time: '2024-09-25T11:50:01.205Z',
    });
  }
}
