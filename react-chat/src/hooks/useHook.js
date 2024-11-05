import { useState, useEffect } from 'react';

const initialChats = [
  {
    messages: [
      {
        name: 'Артем',
        text: 'Привет! Как дела?',
        time: '2024-09-25T11:50:01.205Z',
      },
      {
        name: 'me',
        text: 'Привет! Нормально, только устала после работы. А у тебя?',
        time: '2024-09-25T11:50:01.205Z',
      },
    ],
    name: 'Артем',
    img: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Артем',
    userId: 1,
  },
];

export const useChats = () => {
  const [chats, setChats] = useState(() => {
    const storedChats = localStorage.getItem('CHATS');
    return storedChats ? JSON.parse(storedChats) : initialChats;
  });

  useEffect(() => {
    localStorage.setItem('CHATS', JSON.stringify(chats));
  }, [chats]);

  return { chats, setChats };
};
