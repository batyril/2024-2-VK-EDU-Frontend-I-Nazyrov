import translate from './translate';

(async () => {
  try {
    const translation1 = await translate({
      text: 'apple',
      from: 'en',
      to: 'ru',
    });
    console.log('First translation:', translation1);

    const translation2 = await translate({
      text: 'apple',
      from: 'en',
      to: 'ru',
    });
    console.log('Second translation (from cache):', translation2);

    const translation3 = await translate({
      text: 'orange',
      from: 'en',
      to: 'fr',
    });
    console.log('Another translation:', translation3);
  } catch (error) {
    console.error('Error during testing:', error);
  }
})();
