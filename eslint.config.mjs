import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import htmlParser from '@html-eslint/parser';
import vueParser from 'vue-eslint-parser';
import cedarButtonRules from './tools/eslint/button-rules.mjs';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.cache/**',
      '**/.vite/**',
      '**/.expo/**',
      '**/coverage/**',
      '**/storybook-static/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      cedar: cedarButtonRules,
    },
    rules: {
      'cedar/button': 'error',
    },
  },
  {
    files: ['**/*.{html,htm}'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      cedar: cedarButtonRules,
    },
    rules: {
      'cedar/button': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslint.parser,
      },
    },
    plugins: {
      cedar: cedarButtonRules,
    },
    rules: {
      'cedar/button': 'error',
    },
  },
];
