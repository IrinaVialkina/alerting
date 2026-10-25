// Картка 12 · Однакові оповіщення. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, isSame } from '../src/alerts.js';

test('isSame вважає однаковими два оповіщення з однаковими рівнем і текстом', () => {
  expect(isSame(createAlert('high', 'Пожежа'), createAlert('high', 'Пожежа'))).toBe(true);
});

test('isSame не вважає однаковими оповіщення з різним текстом', () => {
  expect(isSame(createAlert('high', 'Пожежа'), createAlert('high', 'Повінь'))).toBe(false);
});

test('isSame не вважає однаковими оповіщення з різним рівнем', () => {
  expect(isSame(createAlert('high', 'Пожежа'), createAlert('low', 'Пожежа'))).toBe(false);
});
