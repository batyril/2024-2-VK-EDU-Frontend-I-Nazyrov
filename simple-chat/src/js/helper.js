export const formatTime = (time) =>
  new Date(time).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

export function getQueryParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

export const generateUserId = () => Math.floor(Math.random() * 1000);

export const getFromLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

export const saveToLocalStorage = (key, chats) => {
  localStorage.setItem(key, JSON.stringify(chats));
};
