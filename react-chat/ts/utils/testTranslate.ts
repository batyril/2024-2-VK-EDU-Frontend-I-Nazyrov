import translate from './translate';

(async () => {
  try {
    const translation1 = await translate({
      text: 'apple',
      from: 'en',
      to: 'ru',
    });

    const translation2 = await translate({
      text: 'apple',
      from: 'en',
      to: 'ru',
    });

    const translation3 = await translate({
      text: 'orange',
      from: 'en',
      to: 'fr',
    });
  } catch (error) {
    console.error('Error during testing:', error);
  }
})();
