import allVariants from './fragments/all-variants.html?raw';
import darkBackground from './fragments/dark-background.html?raw';
import disabled from './fragments/disabled.html?raw';
import fullWidth from './fragments/full-width.html?raw';
import iconCombos from './fragments/icon-combos.html?raw';
import iconOnly from './fragments/icon-only.html?raw';
import primary from './fragments/primary.html?raw';
import responsiveSizes from './fragments/responsive-sizes.html?raw';
import sizeVariantMatrix from './fragments/size-variant-matrix.html?raw';
import sizes from './fragments/sizes.html?raw';
import withIcons from './fragments/with-icons.html?raw';

export default {
  title: 'Controls/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Buttons communicate actions: primary for the main task, secondary for supporting actions, with link-style, icon-only, and stateful treatments.',
      },
    },
  },
};

export const Primary = {
  render: () => primary,
};

export const WithIcons = {
  render: () => withIcons,
};

export const AllVariants = {
  render: () => allVariants,
};

export const Sizes = {
  render: () => sizes,
};

export const Disabled = {
  render: () => disabled,
};

export const FullWidth = {
  render: () => fullWidth,
};

export const IconOnly = {
  render: () => iconOnly,
};

export const ResponsiveSizes = {
  render: () => responsiveSizes,
};

export const SizeVariantMatrix = {
  render: () => sizeVariantMatrix,
};

export const IconCombos = {
  render: () => iconCombos,
};

export const DarkBackground = {
  render: () => darkBackground,
};
