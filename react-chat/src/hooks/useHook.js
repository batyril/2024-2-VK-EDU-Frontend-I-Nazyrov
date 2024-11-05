import { useState, useEffect } from 'react';

const initialChats = {
  user: {
    id: 'user1231',
    name: 'Ильназ',
    surname: 'Назыров',
    username: 'User123',
    bio: 'Frontend Developer',
    img: 'https://api.dicebear.com/9.x/lorelei/svg?seed=Ильназ',
  },
  chats: [
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
  ],
};

export const useChats = () => {
  const [userData, setUserData] = useState(() => {
    const storedChats = localStorage.getItem('userData');
    return storedChats ? JSON.parse(storedChats) : initialChats;
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData.chats, userData.user]);

  return { userData, setUserData };
};
