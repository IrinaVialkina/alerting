// Картка 8 · Список для екрана. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, formatList } from '../src/alerts.js';

test('formatList записує кожне оповіщення окремим рядком', () => {
  const alerts = [createAlert('high', 'Пожежа'), createAlert('low', 'Перевірка сирен')];
  expect(formatList(alerts)).toBe('[high] Пожежа\n[low] Перевірка сирен');
});

test('formatList для одного оповіщення дає один рядок без переходу на новий', () => {
  expect(formatList([createAlert('high', 'Пожежа')])).toBe('[high] Пожежа');
});

test('formatList для порожнього списку дає порожній рядок', () => {
  expect(formatList([])).toBe('');
});
