import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      exclude: ['**/node_modules/**', 'bin', 'dist', 'src/file.ts'],
    },
  },
});
