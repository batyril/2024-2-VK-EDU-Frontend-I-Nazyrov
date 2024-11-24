import { useEffect } from 'react';
import { Centrifuge } from 'centrifuge';
import getCurrentUser from '../api/user/getCurrentUser.js';
import {
  getCentrifugoToken,
  getSubscribeToken,
} from '../api/centrifugo/index.js';
import EVENT_CENTRIFUGO from '../const/events.js';
import sendNotification from '../helpers/sendNotification.js';

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

          console.log(message);

          if (!isCurrentChat) {
            sendNotification(message);
            return;
          }
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
      return () => {
        return () => {
          centrifuge.disconnect();
          subscription.removeAllListeners();
          subscription.unsubscribe();
        };
      };
    };

    initializeCentrifuge();
  }, [chatId, setMessages]);
};

export default useCentrifuge;
