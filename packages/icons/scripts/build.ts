import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgstore from 'svgstore';
import { optimize } from 'svgo';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const iconsDir = path.join(rootDir, 'src', 'icons');
const distDir = path.join(rootDir, 'dist');
const distIconsDir = path.join(distDir, 'icons');
const distVueDir = path.join(distDir, 'vue');
const distVueIconsDir = path.join(distVueDir, 'icons');
const srcVueDir = path.join(rootDir, 'src', 'vue');

/**
 * Remove and recreate the dist directory.
 */
const ensureCleanDist = async (): Promise<void> => {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
  await fs.mkdir(distIconsDir, { recursive: true });
  await fs.mkdir(distVueIconsDir, { recursive: true });
};

/**
 * Extract the viewBox from an SVG string.
 * @param svg - Raw SVG markup.
 */
const getViewBox = (svg: string): string | null => {
  const match = svg.match(/viewBox="([^"]+)"/);
  return match ? match[1] : null;
};

/**
 * Optimize SVG markup with SVGO.
 * @param svg - Raw SVG markup.
 */
const optimizeSvg = (svg: string): string =>
  optimize(svg, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeDimensions',
    ],
  }).data;

type IconMeta = {
  viewBox: string | null;
  category: string;
  tags: string[];
};

type IconMetaOverrides = Record<string, Partial<IconMeta>>;

/**
 * Load optional metadata overrides for icons.
 */
const loadOverrides = async (): Promise<IconMetaOverrides> => {
  const overridesPath = path.join(rootDir, 'src', 'icon-meta.overrides.json');
  try {
    const data = await fs.readFile(overridesPath, 'utf8');
    return JSON.parse(data) as IconMetaOverrides;
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
};

const ignoredTokens = new Set(['sm', 'lg', 'xl', 'xs', 'md', 'fill', 'stroke']);
const brandTokens = new Set([
  'facebook',
  'twitter',
  'youtube',
  'instagram',
  'linkedin',
  'pinterest',
  'tiktok',
  'github',
  'dribbble',
  'slack',
  'reddit',
  'medium',
  'snapchat',
  'discord',
  'sketch',
  'behance',
  'brand',
]);

const categoryRules = [
  { category: 'brand', tokens: brandTokens },
  {
    category: 'navigation',
    tokens: new Set([
      'arrow',
      'caret',
      'chevron',
      'direction',
      'sort',
      'filter',
      'menu',
    ]),
  },
  {
    category: 'status',
    tokens: new Set([
      'check',
      'warning',
      'error',
      'info',
      'information',
      'question',
      'verified',
    ]),
  },
  {
    category: 'media',
    tokens: new Set([
      'play',
      'pause',
      'stop',
      'microphone',
      'camera',
      'image',
      'video',
    ]),
  },
  {
    category: 'commerce',
    tokens: new Set([
      'cart',
      'coupon',
      'shipping',
      'store',
      'price',
      'tag',
      'bag',
    ]),
  },
  {
    category: 'outdoor',
    tokens: new Set([
      'camping',
      'hiking',
      'ski',
      'snow',
      'trail',
      'backpacking',
      'paddling',
      'boating',
      'climb',
      'run',
      'travel',
      'picnic',
      'wilderness',
      'water',
      'canoe',
      'atv',
    ]),
  },
  {
    category: 'interface',
    tokens: new Set([
      'plus',
      'minus',
      'close',
      'x',
      'search',
      'zoom',
      'settings',
      'gear',
      'list',
      'grid',
      'map',
      'location',
      'pin',
      'calendar',
      'clock',
      'print',
      'copy',
      'link',
      'lock',
      'eye',
      'upload',
      'download',
      'refresh',
      'reload',
    ]),
  },
];

/**
 * Resolve an icon category based on filename tokens.
 * @param tokens - Filename tokens split on dashes.
 * @param name - Original icon name.
 */
const resolveCategory = (tokens: string[], name: string): string => {
  const tokenSet = new Set(tokens);
  for (const rule of categoryRules) {
    for (const token of rule.tokens) {
      if (tokenSet.has(token) || name.includes(token)) {
        return rule.category;
      }
    }
  }
  return 'misc';
};

/**
 * Build metadata for a single icon.
 * @param name - Icon name.
 * @param viewBox - Icon viewBox string, if present.
 * @param overrides - Optional overrides for category/tags/viewBox.
 */
const buildMeta = (
  name: string,
  viewBox: string | null,
  overrides: Partial<IconMeta> = {},
): IconMeta => {
  const tokens = name.split('-');
  const tags = new Set(
    tokens.filter((token) => token && !ignoredTokens.has(token)),
  );
  tags.add(name);

  const baseMeta: IconMeta = {
    viewBox,
    category: resolveCategory(tokens, name),
    tags: Array.from(tags).sort(),
  };

  return {
    ...baseMeta,
    ...overrides,
  };
};

/**
 * Convert a kebab-case icon name to PascalCase.
 * @param name - Icon name.
 */
const toPascalCase = (name: string): string =>
  name
    .split('-')
    .map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : ''))
    .join('');

/**
 * Extract inner SVG markup from an SVG string and normalize presentation roles.
 * @param svg - Raw SVG markup.
 */
const extractSvgInner = (svg: string): string => {
  const match = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) return '';
  const inner = match[1].trim();
  return inner.replace(/<path\b(?![^>]*\brole=)/g, '<path role="presentation"');
};

/**
 * Read, optimize, and index all icons from src/icons.
 */
const readIcons = async (): Promise<{
  icons: Record<string, string>;
  iconMeta: Record<string, IconMeta>;
  iconNames: string[];
  sprite: ReturnType<typeof svgstore>;
}> => {
  const overrides = await loadOverrides();
  const entries = await fs.readdir(iconsDir);
  const svgFiles = entries.filter((file) => file.endsWith('.svg')).sort();

  const icons: Record<string, string> = {};
  const iconMeta: Record<string, IconMeta> = {};
  const iconNames: string[] = [];
  const sprite = svgstore({ inline: true });

  for (const file of svgFiles) {
    const name = path.basename(file, '.svg');
    const rawSvg = await fs.readFile(path.join(iconsDir, file), 'utf8');
    const svg = optimizeSvg(rawSvg);
    const viewBox = getViewBox(svg);

    icons[name] = svg;
    iconMeta[name] = buildMeta(name, viewBox, overrides[name]);
    iconNames.push(name);
    sprite.add(name, svg);

    await fs.writeFile(path.join(distIconsDir, file), svg);
  }

  return { icons, iconMeta, iconNames, sprite };
};

/**
 * Write the full SVG sprite to dist.
 * @param sprite - svgstore instance with all icons added.
 */
const writeSprite = async (
  sprite: ReturnType<typeof svgstore>,
): Promise<void> => {
  await fs.writeFile(path.join(distDir, 'sprite.svg'), sprite.toString());
};

/**
 * Write icon JSON outputs to dist.
 * @param icons - Map of icon name to SVG markup.
 * @param iconMeta - Map of icon name to metadata.
 * @param iconNames - Ordered list of icon names.
 */
const writeIconData = async (
  icons: Record<string, string>,
  iconMeta: Record<string, IconMeta>,
  iconNames: string[],
): Promise<void> => {
  const iconsJson = JSON.stringify(icons, null, 2);
  const iconMetaJson = JSON.stringify(iconMeta, null, 2);
  const iconNamesJson = JSON.stringify(iconNames, null, 2);

  await fs.writeFile(path.join(distDir, 'icons.json'), iconsJson);
  await fs.writeFile(path.join(distDir, 'icon-meta.json'), iconMetaJson);
  await fs.writeFile(path.join(distDir, 'icon-names.json'), iconNamesJson);
};

/**
 * Write ESM and CJS modules to dist.
 * @param icons - Map of icon name to SVG markup.
 * @param iconMeta - Map of icon name to metadata.
 * @param iconNames - Ordered list of icon names.
 */
const writeModule = async (
  icons: Record<string, string>,
  iconMeta: Record<string, IconMeta>,
  iconNames: string[],
): Promise<void> => {
  const iconsLiteral = JSON.stringify(icons, null, 2);
  const iconMetaLiteral = JSON.stringify(iconMeta, null, 2);
  const iconNamesLiteral = JSON.stringify(iconNames, null, 2);

  const esm =
    `export const icons = ${iconsLiteral};\n` +
    `export const iconMeta = ${iconMetaLiteral};\n` +
    `export const iconNames = ${iconNamesLiteral};\n` +
    `export const getIcon = (name) => icons[name];\n` +
    `export const getIconMeta = (name) => iconMeta[name];\n` +
    `export default icons;\n`;

  const cjs =
    `const icons = ${iconsLiteral};\n` +
    `const iconMeta = ${iconMetaLiteral};\n` +
    `const iconNames = ${iconNamesLiteral};\n` +
    `const getIcon = (name) => icons[name];\n` +
    `const getIconMeta = (name) => iconMeta[name];\n` +
    `module.exports = { icons, iconMeta, iconNames, getIcon, getIconMeta, default: icons };\n`;

  await fs.writeFile(path.join(distDir, 'index.mjs'), esm);
  await fs.writeFile(path.join(distDir, 'index.cjs'), cjs);
};

/**
 * Write TypeScript declarations to dist.
 * @param iconNames - Ordered list of icon names.
 */
const writeTypes = async (iconNames: string[]): Promise<void> => {
  const union = iconNames.map((name) => `'${name}'`).join(' | ');
  const types =
    `export type IconName = ${union};\n` +
    `export type IconMeta = { viewBox: string | null; category: string; tags: string[] };\n` +
    `export const iconNames: readonly IconName[];\n` +
    `export const iconMeta: Record<IconName, IconMeta>;\n` +
    `export const icons: Record<IconName, string>;\n` +
    `export const getIcon: (name: IconName) => string;\n` +
    `export const getIconMeta: (name: IconName) => IconMeta;\n` +
    `declare const _default: Record<IconName, string>;\n` +
    `export default _default;\n`;

  await fs.writeFile(path.join(distDir, 'index.d.ts'), types);
};

/**
 * Write Vue single-file components for each icon.
 * @param icons - Map of icon name to SVG markup.
 */
const writeVueComponents = async (
  icons: Record<string, string>,
): Promise<void> => {
  const entries = Object.entries(icons);
  const exportLines: string[] = [];

  const c1IconPath = path.join(srcVueDir, 'C1Icon.vue');
  try {
    const c1Icon = await fs.readFile(c1IconPath, 'utf8');
    await fs.writeFile(path.join(distVueDir, 'C1Icon.vue'), c1Icon);
    exportLines.push(`export { default as C1Icon } from './C1Icon.vue';`);
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== 'ENOENT') {
      throw error;
    }
  }

  for (const [name, svg] of entries) {
    const componentName = `C1Icon${toPascalCase(name)}`;
    const inner = extractSvgInner(svg);

    const sfc = `<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import C1Icon from '../C1Icon.vue';

defineOptions({ name: '${componentName}' });

type IconSize = string;

const props = defineProps<{
  size?: IconSize;
  inheritColor?: boolean;
  props?: Record<string, unknown>;
}>();

const attrs = useAttrs();
const resolvedSize = computed(
  () => props.size ?? (props.props as { size?: IconSize } | undefined)?.size,
);
const resolvedInheritColor = computed(
  () =>
    props.inheritColor ??
    (props.props as { inheritColor?: boolean } | undefined)?.inheritColor ??
    false,
);
const iconProps = computed(() => ({
  ...(props.props ?? {}),
  ...attrs,
  size: resolvedSize.value,
  inheritColor: resolvedInheritColor.value,
}));
</script>

<template>
  <C1Icon v-bind="iconProps">
    <slot />
    ${inner}
  </C1Icon>
</template>
`;

    await fs.writeFile(path.join(distVueIconsDir, `${name}.vue`), sfc);
    exportLines.push(
      `export { default as ${componentName} } from './icons/${name}.vue';`,
    );
  }

  const indexJs = `${exportLines.join('\n')}\n`;
  const indexTypes = `${exportLines.join('\n')}\n`;

  await fs.writeFile(path.join(distVueDir, 'index.js'), indexJs);
  await fs.writeFile(path.join(distVueDir, 'index.d.ts'), indexTypes);
};

/**
 * Build optimized icon assets and module outputs.
 */
const build = async (): Promise<void> => {
  await ensureCleanDist();

  const { icons, iconMeta, iconNames, sprite } = await readIcons();

  await Promise.all([
    writeSprite(sprite),
    writeIconData(icons, iconMeta, iconNames),
    writeModule(icons, iconMeta, iconNames),
    writeTypes(iconNames),
    writeVueComponents(icons),
  ]);
};

build();
