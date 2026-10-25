import { defineConfig } from 'vitest/config';

// Запускаються лише тести з теки tests/. Тести карток лежать у cards/, доки їх не перенесуть до tests/.
export default defineConfig({
  test: { include: ['tests/**/*.spec.js'] },
});
