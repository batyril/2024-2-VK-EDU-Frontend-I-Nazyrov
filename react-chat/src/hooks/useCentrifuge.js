import { useEffect } from 'react';
import { Centrifuge } from 'centrifuge';

import EVENT_CENTRIFUGO from '../const/events.js';
import sendNotification from '../helpers/sendNotification.js';
import { userService } from '../api/userService/index.js';
import { useDispatch } from 'react-redux';
import centrifugoService from '../api/centrifugo/index.js';
import {
  addMessage,
  deleteMessage,
  updateMessage,
} from '../store/message/slice.js';

const useCentrifuge = (chatId) => {
  const dispatch = useDispatch();
  const { getCurrentUser } = userService();
  const { getToken, getSubscribeToken } = centrifugoService();
  useEffect(() => {
    let centrifuge;
    let subscription;

    const initializeCentrifuge = async () => {
      try {
        const userData = await getCurrentUser();
        const connectToken = await getToken();
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

          if (!isCurrentChat) {
            sendNotification(message);
            return;
          }

          switch (event) {
            case EVENT_CENTRIFUGO.CREATE:
              dispatch(addMessage(message));
              break;
            case EVENT_CENTRIFUGO.UPDATE:
              dispatch(updateMessage(message));
              break;
            case EVENT_CENTRIFUGO.DELETE:
              dispatch(deleteMessage(message.id));
              break;
            default:
              break;
          }
        });

        subscription.subscribe();
        centrifuge.connect();
      } catch (error) {
        console.error('Failed to initialize Centrifuge:', error);
      }

      return () => {
        if (subscription) {
          subscription.removeAllListeners();
          subscription.unsubscribe();
          subscription = null;
        }
        if (centrifuge) {
          centrifuge.disconnect();
          centrifuge = null;
        }
      };
    };

    initializeCentrifuge();
  }, [chatId, dispatch, getCurrentUser, getSubscribeToken, getToken]);
};

export default useCentrifuge;
