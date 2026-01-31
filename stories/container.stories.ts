type ContainerVariant = 'static' | 'fluid';

const CONTAINER_MARKUP: Record<ContainerVariant, string> = {
  static: `
    <div style="background:#f4f2ef;padding:16px;">
      <div class="cdr-container cdr-container--static" style="background:#fff;border:1px solid #d8d3cc;">
        <div style="padding:16px;">
          <strong>static</strong> container content
        </div>
      </div>
    </div>
  `,
  fluid: `
    <div style="background:#f4f2ef;padding:16px;">
      <div class="cdr-container cdr-container--fluid" style="background:#fff;border:1px solid #d8d3cc;">
        <div style="padding:16px;">
          <strong>fluid</strong> container content
        </div>
      </div>
    </div>
  `,
};

const renderContainer = (variant: ContainerVariant) =>
  CONTAINER_MARKUP[variant];

export default {
  title: 'Container',
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
  render: () => `
    <div style="display:grid;gap:16px;">
      ${renderContainer('static')}
      ${renderContainer('fluid')}
    </div>
  `,
};
