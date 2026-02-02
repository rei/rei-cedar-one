import base from './fragments/base.html?raw';
import inheritColor from './fragments/inherit-color.html?raw';
import responsive from './fragments/responsive.html?raw';
import sizes from './fragments/sizes.html?raw';
import sprite from './fragments/sprite.html?raw';

export default {
  title: 'Utilities/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icons are inline SVGs that can be sized with modifier classes and inherit fill color from their parent when needed.',
      },
    },
  },
};

export const Base = {
  render: () => base,
};

export const InheritColor = {
  render: () => inheritColor,
};

export const Sizes = {
  render: () => sizes,
};

export const Responsive = {
  render: () => responsive,
};

export const Sprite = {
  render: () => sprite,
};
