import fluid from './fragments/fluid.html?raw';
import sideBySide from './fragments/side-by-side.html?raw';
import staticMarkup from './fragments/static.html?raw';

type ContainerVariant = 'static' | 'fluid';

const CONTAINER_MARKUP: Record<ContainerVariant, string> = {
  static: staticMarkup,
  fluid,
};

const renderContainer = (variant: ContainerVariant) =>
  CONTAINER_MARKUP[variant];

export default {
  title: 'HTML/Layout/Container',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Cedar containers center content and provide page gutters aligned to REI layouts; static and fluid variants control width.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['static', 'fluid'],
    },
  },
  render: ({ variant }: { variant: ContainerVariant }) =>
    renderContainer(variant),
};

export const Static = {
  args: { variant: 'static' },
};

export const Fluid = {
  args: { variant: 'fluid' },
};

export const SideBySide = {
  render: () => sideBySide,
};
