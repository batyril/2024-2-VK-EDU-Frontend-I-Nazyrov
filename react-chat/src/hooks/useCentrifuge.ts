import { useEffect } from 'react';
import { Centrifuge, Subscription } from 'centrifuge';
import EVENT_CENTRIFUGO from '../const/events.ts';
import sendNotification from '../helpers/sendNotification.ts';
import { userService } from '../api/userService';
import { useDispatch } from 'react-redux';
import centrifugoService from '../api/centrifugo/index.ts';
import {
  addMessage,
  deleteMessage,
  updateMessage,
} from '../store/message/slice.ts';

const useCentrifuge = (chatId: string) => {
  const dispatch = useDispatch();
  const { getCurrentUser } = userService();
  const { getToken, getSubscribeToken } = centrifugoService();
  useEffect(() => {
    let centrifuge: null | Centrifuge;
    let subscription: null | Subscription;

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
