import convertBytesToHuman from './convertBytesToHuman.js';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false);
  expect(convertBytesToHuman('string')).toBe(false);
  expect(convertBytesToHuman({ count: '5' })).toBe(false);
  expect(convertBytesToHuman(undefined)).toBe(false);
  expect(convertBytesToHuman(NaN)).toBe(false);
  expect(convertBytesToHuman(Infinity)).toBe(false);
  expect(convertBytesToHuman([1, 3, 4, 5, 6])).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe('0 B');
  expect(convertBytesToHuman(5)).toBe('5 B');
  expect(convertBytesToHuman(1023)).toBe('1023 B');
  expect(convertBytesToHuman(1024)).toBe('1 KB');
  expect(convertBytesToHuman(1546)).toBe('1.51 KB');
  expect(convertBytesToHuman(1048345)).toBe('1023.77 KB');
  expect(convertBytesToHuman(1048576)).toBe('1 MB');
  expect(convertBytesToHuman(123123123)).toBe('117.42 MB');
  expect(convertBytesToHuman(1073741824)).toBe('1 GB');
  expect(convertBytesToHuman(2543564566)).toBe('2.37 GB');
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB');
  expect(convertBytesToHuman(3453453454545)).toBe('3.14 TB');
  expect(convertBytesToHuman(1152921504606846976)).toBe('1048576 TB');
});
