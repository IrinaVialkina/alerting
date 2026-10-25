import { test, expect } from 'vitest';
import { formatAlert, isUrgent, countUrgent, createAlert } from '../src/alerts.js';

test('formatAlert записує оповіщення як рядок із рівнем у квадратних дужках', () => {
  expect(formatAlert({ level: 'high', text: 'Пожежа' })).toBe('[high] Пожежа');
});

test('formatAlert бере рівень і текст із самого оповіщення', () => {
  expect(formatAlert({ level: 'low', text: 'Перевірка сирен' })).toBe('[low] Перевірка сирен');
});

test('isUrgent вважає оповіщення високого рівня терміновим', () => {
  expect(isUrgent({ level: 'high', text: 'Пожежа' })).toBe(true);
});

test('isUrgent не вважає оповіщення низького рівня терміновим', () => {
  expect(isUrgent({ level: 'low', text: 'Перевірка сирен' })).toBe(false);
});

test('countUrgent для порожнього списку дає нуль', () => {
  expect(countUrgent([])).toBe(0);
});

test('countUrgent рахує одне термінове оповіщення', () => {
  expect(countUrgent([{ level: 'high', text: 'Пожежа' }])).toBe(1);
});

test('countUrgent не рахує оповіщень низького рівня', () => {
  const alerts = [
    { level: 'low', text: 'Перевірка сирен' },
    { level: 'low', text: 'Планові роботи' },
  ];
  expect(countUrgent(alerts)).toBe(0);
});

test('countUrgent рахує лише термінові оповіщення змішаного списку', () => {
  const alerts = [
    { level: 'high', text: 'Пожежа' },
    { level: 'low', text: 'Перевірка сирен' },
    { level: 'high', text: 'Повінь' },
  ];
  expect(countUrgent(alerts)).toBe(2);
});

test('createAlert створює оповіщення з рівнем і текстом, ще не надіслане', () => {
  expect(createAlert('high', 'Пожежа')).toEqual({ level: 'high', text: 'Пожежа', sent: false });
});

test('createAlert бере рівень і текст з аргументів', () => {
  expect(createAlert('low', 'Перевірка сирен')).toEqual({ level: 'low', text: 'Перевірка сирен', sent: false });
});

test('createAlert під час кожного виклику створює новий об’єкт', () => {
  const first = createAlert('high', 'Пожежа');
  const second = createAlert('high', 'Пожежа');
  expect(first).not.toBe(second);
});

test('createAlert не створює оповіщення з невідомим рівнем', () => {
  expect(() => createAlert('urgent', 'Пожежа')).toThrow();
});
