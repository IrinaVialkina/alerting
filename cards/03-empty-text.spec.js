// Картка 3 · Порожній текст. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert } from '../src/alerts.js';

test('createAlert не створює оповіщення без тексту', () => {
  expect(() => createAlert('high', '')).toThrow();
});

test('createAlert не створює оповіщення, текст якого складається з пробілів', () => {
  expect(() => createAlert('high', '   ')).toThrow();
});

test('createAlert відкидає пробіли на початку і в кінці тексту', () => {
  expect(createAlert('high', '  Пожежа ').text).toBe('Пожежа');
});
