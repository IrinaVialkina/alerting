// Картка 6 · Підрахунок за рівнем. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, countByLevel } from '../src/alerts.js';

const alerts = [
  createAlert('high', 'Пожежа'),
  createAlert('low', 'Перевірка сирен'),
  createAlert('high', 'Повінь'),
];

test('countByLevel рахує оповіщення високого рівня', () => {
  expect(countByLevel(alerts, 'high')).toBe(2);
});

test('countByLevel рахує оповіщення низького рівня', () => {
  expect(countByLevel(alerts, 'low')).toBe(1);
});

test('countByLevel для порожнього списку дає нуль', () => {
  expect(countByLevel([], 'high')).toBe(0);
});
