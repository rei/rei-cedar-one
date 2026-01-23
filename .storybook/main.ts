import type { StorybookConfig } from '@storybook/html-vite';

const basePath = process.env.STORYBOOK_BASE_PATH || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

const config: StorybookConfig = {
  stories: ['../stories/html/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      base: normalizedBasePath,
    };
  },
};

export default config;
