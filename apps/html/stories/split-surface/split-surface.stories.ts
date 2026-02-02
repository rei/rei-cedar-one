import bottom from './fragments/bottom.html?raw';
import top from './fragments/top.html?raw';

export default {
  title: 'Layout/Split Surface',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Split surfaces introduce a new surface layer to create visual impact and a smooth transition between content sections.',
      },
    },
  },
};

export const BottomSurface = {
  render: () => bottom,
};

export const TopSurface = {
  render: () => top,
};
