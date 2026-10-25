// Картка 4 · Позначити як надіслане. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, markSent } from '../src/alerts.js';

test('markSent робить оповіщення надісланим', () => {
  const alert = createAlert('high', 'Пожежа');
  markSent(alert);
  expect(alert.sent).toBe(true);
});

test('markSent не змінює рівня і тексту оповіщення', () => {
  const alert = createAlert('high', 'Пожежа');
  markSent(alert);
  expect(alert).toEqual({ level: 'high', text: 'Пожежа', sent: true });
});
