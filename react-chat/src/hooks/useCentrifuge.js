import { useEffect } from 'react';
import { Centrifuge } from 'centrifuge';
import getCurrentUser from '../API/USER/getCurrentUser.js';
import {
  getCentrifugoToken,
  getSubscribeToken,
} from '../API/CENTRIFUGO/index.js';
import EVENT_CENTRIFUGO from '../const/events.js';

const useCentrifuge = (chatId, setMessages) => {
  useEffect(() => {
    let centrifuge;
    let subscription;

    const initializeCentrifuge = async () => {
      try {
        const userData = await getCurrentUser();
        const connectToken = await getCentrifugoToken();
        const subscribeToken = await getSubscribeToken(userData.id);

        centrifuge = new Centrifuge(
          'wss://vkedu-fullstack-div2.ru/connection/websocket/',
          {
            getToken: () => Promise.resolve(connectToken),
          },
        );

        subscription = centrifuge.newSubscription(userData.id, {
          getToken: () => Promise.resolve(subscribeToken),
        });

        subscription.on('publication', (ctx) => {
          const { event, message } = ctx.data;

          const isCurrentChat = message.chat === chatId;
          if (!isCurrentChat) return;

          setMessages((prevMessages) => {
            switch (event) {
              case EVENT_CENTRIFUGO.CREATE: {
                const checkDuplication = prevMessages.some(
                  (msg) => msg.id === message.id,
                );

                if (checkDuplication) return prevMessages;

                return [...prevMessages, message];
              }

              case EVENT_CENTRIFUGO.UPDATE:
                return prevMessages.map((msg) =>
                  msg.id === message.id ? message : msg,
                );

              case EVENT_CENTRIFUGO.DELETE:
                return prevMessages.filter((msg) => msg.id !== message.id);

              default:
                return prevMessages;
            }
          });
        });

        subscription.subscribe();
        centrifuge.connect();
      } catch (error) {
        console.error('Failed to initialize Centrifuge:', error);
      }
    };

    initializeCentrifuge();
  }, [chatId, setMessages]);
};

export default useCentrifuge;
