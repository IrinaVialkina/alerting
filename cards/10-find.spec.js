// Картка 10 · Пошук за словом. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, findByWord } from '../src/alerts.js';

const fire = createAlert('high', 'Пожежа в корпусі 2');
const check = createAlert('low', 'Перевірка сирен у корпусі 5');
const flood = createAlert('high', 'Повінь на вулиці Шевченка');
const alerts = [fire, check, flood];

test('findByWord знаходить оповіщення, текст якого містить слово', () => {
  expect(findByWord(alerts, 'Повінь')).toBe(flood);
});

test('findByWord повертає перше з кількох оповіщень, що містять слово', () => {
  expect(findByWord(alerts, 'корпус')).toBe(fire);
});

test('findByWord повертає undefined, якщо слова немає в жодному оповіщенні', () => {
  expect(findByWord(alerts, 'Буревій')).toBe(undefined);
});
