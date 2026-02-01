import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import htmlParser from '@html-eslint/parser';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';
import cedar from '@rei/c1-lint';

const cedarRecommendedRules = cedar.configs.recommended.rules;

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
      cedar,
    },
    rules: {
      ...cedarRecommendedRules,
    },
  },
  {
    files: ['**/*.{html,htm}'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      cedar,
    },
    rules: {
      ...cedarRecommendedRules,
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
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      cedar,
    },
    rules: {
      ...cedarRecommendedRules,
    },
  },
];
