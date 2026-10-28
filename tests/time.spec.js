import { test, expect } from 'vitest';
import { daysInMonth } from '../src/time.js';

test('daysInMonth: у січні 31 день', () => {
  expect(daysInMonth(1, 2025)).toBe(31);
});

test('daysInMonth: у квітні 30 днів', () => {
  expect(daysInMonth(4, 2025)).toBe(30);
});

test('daysInMonth: у лютому 2025 року 28 днів', () => {
  expect(daysInMonth(2, 2025)).toBe(28);
});
