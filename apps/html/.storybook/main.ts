import type { StorybookConfig } from '@storybook/html-vite';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const iconPlaceholderPattern = /\{\{\s*icon:([a-z0-9-]+)\s*\}\}/g;

const inlineIconFragments = () => {
  const storybookDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(storybookDir, '..', '..', '..');
  const iconsDir = path.resolve(repoRoot, 'packages/icons/dist/icons');
  const iconCache = new Map<string, string>();

  const loadIconMarkup = async (name: string) => {
    if (iconCache.has(name)) {
      return iconCache.get(name) ?? '';
    }
    const iconPath = path.join(iconsDir, `${name}.svg`);
    const svg = await readFile(iconPath, 'utf8').catch((error) => {
      const err = new Error(`Missing icon asset: ${name}.svg`);
      (err as Error & { cause?: unknown }).cause = error;
      throw err;
    });
    const inner = svg
      .replace(/<svg[^>]*>/i, '')
      .replace(/<\/svg>\s*$/i, '')
      .trim();
    iconCache.set(name, inner);
    return inner;
  };

  return {
    name: 'inline-icon-fragments',
    enforce: 'pre' as const,
    async load(id: string) {
      if (!id.endsWith('.html?raw')) return null;
      if (!id.includes('/stories/')) return null;
      const [filePath] = id.split('?', 1);
      const source = await readFile(filePath, 'utf8');
      if (!source.includes('{{icon:')) return null;

      const matches = [...source.matchAll(iconPlaceholderPattern)];
      if (!matches.length) return null;

      let transformed = source;
      for (const match of matches) {
        const iconMarkup = await loadIconMarkup(match[1]);
        transformed = transformed.split(match[0]).join(iconMarkup);
      }

      return `export default ${JSON.stringify(transformed)};`;
    },
  };
};

const basePath = process.env.STORYBOOK_BASE_PATH || '/';
const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: [{ from: '../../../docs/assets', to: '/assets' }],
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
      plugins: [inlineIconFragments(), ...(viteConfig.plugins ?? [])],
    };
  },
};

export default config;
