import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import plugin from './dist/index.js';

export default [
  {
    ignores: ['dist/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      cedar: plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
    },
  },
];
