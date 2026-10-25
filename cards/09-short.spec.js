// Картка 9 · Коротке повідомлення. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, formatShort } from '../src/alerts.js';

test('formatShort не змінює короткого оповіщення', () => {
  expect(formatShort(createAlert('high', 'Пожежа'), 20)).toBe('[high] Пожежа');
});

test('formatShort обрізає довге оповіщення до заданої довжини і закінчує його трьома крапками', () => {
  const alert = createAlert('low', 'Планова перевірка сирен о 12:00');
  expect(formatShort(alert, 20)).toBe('[low] Планова пер...');
});

test('formatShort не обрізає оповіщення, довжина якого дорівнює межі', () => {
  expect(formatShort(createAlert('high', 'Пожежа'), 13)).toBe('[high] Пожежа');
});
