// Картка 5 · Стан оповіщення. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, formatStatus } from '../src/alerts.js';

test('formatStatus позначає ненадіслане оповіщення як таке, що очікує', () => {
  expect(formatStatus(createAlert('high', 'Пожежа'))).toBe('[high] Пожежа (очікує)');
});

test('formatStatus позначає надіслане оповіщення як надіслане', () => {
  const alert = { level: 'low', text: 'Перевірка сирен', sent: true };
  expect(formatStatus(alert)).toBe('[low] Перевірка сирен (надіслано)');
});
