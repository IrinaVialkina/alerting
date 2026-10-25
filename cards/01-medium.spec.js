// Картка 1 · Середній рівень. Перенесіть цей файл до теки tests/.
import { test, expect } from 'vitest';
import { createAlert, isUrgent } from '../src/alerts.js';

test('createAlert приймає середній рівень medium', () => {
  expect(createAlert('medium', 'Відключення світла').level).toBe('medium');
});

test('isUrgent не вважає оповіщення середнього рівня терміновим', () => {
  expect(isUrgent(createAlert('medium', 'Відключення світла'))).toBe(false);
});
