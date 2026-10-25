// Картка 11 · Підсумок. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, summary } from '../src/alerts.js';

test('summary містить загальну кількість оповіщень і кількість термінових', () => {
  const alerts = [
    createAlert('high', 'Пожежа'),
    createAlert('low', 'Перевірка сирен'),
    createAlert('high', 'Повінь'),
  ];
  expect(summary(alerts)).toBe('Усього: 3, термінових: 2');
});

test('summary для порожнього списку містить нулі', () => {
  expect(summary([])).toBe('Усього: 0, термінових: 0');
});
