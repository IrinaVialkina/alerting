// Картка 7 · Ненадіслані оповіщення. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, pending } from '../src/alerts.js';

const fire = createAlert('high', 'Пожежа');
const check = { level: 'low', text: 'Перевірка сирен', sent: true };
const flood = createAlert('high', 'Повінь');

test('pending відбирає ненадіслані оповіщення в порядку списку', () => {
  expect(pending([fire, check, flood])).toEqual([fire, flood]);
});

test('pending дає порожній масив, якщо все надіслано', () => {
  expect(pending([check])).toEqual([]);
});

test('pending не змінює вихідного списку', () => {
  const alerts = [fire, check, flood];
  pending(alerts);
  expect(alerts.length).toBe(3);
});
