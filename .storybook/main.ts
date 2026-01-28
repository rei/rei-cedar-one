import type { StorybookConfig } from '@storybook/html-vite';

const basePath = process.env.STORYBOOK_BASE_PATH || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: [{ from: '../docs/assets', to: '/assets' }],
  addons: [
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
  ],
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
