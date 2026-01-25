import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import htmlParser from '@html-eslint/parser';
import vueParser from 'vue-eslint-parser';
import cedarButtonRules from './tools/eslint/button-rules.mjs';
import cedarContainerRules from './tools/eslint/container-rules.mjs';

const cedarRules = {
  rules: {
    ...cedarButtonRules.rules,
    ...cedarContainerRules.rules,
  },
};

const cedarRecommendedRules = {
  ...cedarButtonRules.configs.recommended.rules,
  ...cedarContainerRules.configs.recommended.rules,
};

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
      cedar: cedarRules,
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
      cedar: cedarRules,
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
    },
    plugins: {
      cedar: cedarRules,
    },
    rules: {
      ...cedarRecommendedRules,
    },
  },
];
