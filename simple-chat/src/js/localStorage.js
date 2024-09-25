import messages from './db';
import { render } from './render';

const MESSAGES_KEY = 'messages';

export function saveMessagesLS() {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function loadMessagesLS() {
  const storedMessages = localStorage.getItem(MESSAGES_KEY);
  if (storedMessages) {
    try {
      const parsedMessages = JSON.parse(storedMessages);
      messages.push(...parsedMessages);
    } catch (error) {
      console.error('Ошибка при парсинге сообщений из localStorage:', error);
    }
  } else {
    messages.push({
      name: 'Ярослав',
      text: 'Привет! Расскажи о себе?',
      time: '2024-09-25T11:50:01.205Z',
    });
  }
  render();
}
