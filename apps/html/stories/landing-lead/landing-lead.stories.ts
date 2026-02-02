import defaultLead from './fragments/default.html?raw';
import onPalette from './fragments/on-palette.html?raw';

export default {
  title: 'Layout/Landing Lead',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Landing leads introduce a landing page with a prominent image, heading, and subheading near the top of the page.',
      },
    },
  },
};

export const Default = {
  render: () => defaultLead,
};

export const OnPalette = {
  render: () => onPalette,
};
