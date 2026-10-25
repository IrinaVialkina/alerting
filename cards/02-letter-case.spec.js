// Картка 2 · Великі літери в рівні. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert } from '../src/alerts.js';

test('createAlert приймає рівень, записаний великими літерами', () => {
  expect(createAlert('HIGH', 'Пожежа').level).toBe('high');
});

test('createAlert приймає рівень, записаний з великої літери', () => {
  expect(createAlert('High', 'Пожежа').level).toBe('high');
});

test('createAlert не приймає невідомого рівня і великими літерами', () => {
  expect(() => createAlert('URGENT', 'Пожежа')).toThrow();
});
