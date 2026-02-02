import base from './fragments/base.html?raw';
import buttonTag from './fragments/button-tag.html?raw';
import modifiers from './fragments/modifiers.html?raw';

export default {
  title: 'Controls/Link',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Link styles cover neutral and standalone treatments plus button-tag links for actions that look like links.',
      },
    },
  },
};

export const Base = {
  render: () => base,
};

export const ButtonTag = {
  render: () => buttonTag,
};

export const Modifiers = {
  render: () => modifiers,
};
