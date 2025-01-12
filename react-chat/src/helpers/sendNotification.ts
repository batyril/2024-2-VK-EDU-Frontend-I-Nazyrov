interface message {
  text: string;
  sender: { first_name: string };
}

const sendNotification = (message: message) => {
  if (!('Notification' in window)) {
    console.warn('Этот браузер не поддерживает уведомления на рабочем столе');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification('Новое сообщение', {
      body: `${message.sender.first_name}: ${message.text}`,
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Новое сообщение', {
          body: `${message.sender.first_name}: ${message.text}`,
        });
      }
    });
  }
};

export default sendNotification;
