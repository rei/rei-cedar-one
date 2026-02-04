import base from './fragments/base.html?raw';
import loading from './fragments/loading.html?raw';
import objectFit from './fragments/object-fit.html?raw';
import objectPosition from './fragments/object-position.html?raw';
import radius from './fragments/radius.html?raw';
import ratios from './fragments/ratios.html?raw';

export default {
  title: 'HTML/Media/Image',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Images are used to illustrate, compare, tell stories, or convey brand; utilities handle ratios, fit, position, and radius.',
      },
    },
  },
};

export const Base = {
  render: () => base,
};

export const Ratios = {
  render: () => ratios,
};

export const ObjectFit = {
  render: () => objectFit,
};

export const ObjectPosition = {
  render: () => objectPosition,
};

export const Radius = {
  render: () => radius,
};

export const Loading = {
  render: () => loading,
};
