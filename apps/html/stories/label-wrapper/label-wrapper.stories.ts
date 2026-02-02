import base from './fragments/base.html?raw';
import disabled from './fragments/disabled.html?raw';
import hideFigure from './fragments/hide-figure.html?raw';
import responsiveSizes from './fragments/responsive-sizes.html?raw';
import secondary from './fragments/secondary.html?raw';
import sizes from './fragments/sizes.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:480px;">
    ${content}
  </div>
`;

export default {
  title: 'Forms/Label Wrapper',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Label wrappers style checkbox and radio labels, including figure placement, background variants, and size-responsive spacing.',
      },
    },
  },
};

export const Base = {
  render: () => renderBlock(base),
};

export const Secondary = {
  render: () => renderBlock(secondary),
};

export const Disabled = {
  render: () => renderBlock(disabled),
};

export const HideFigure = {
  render: () => renderBlock(hideFigure),
};

export const Sizes = {
  render: () => renderBlock(sizes),
};

export const ResponsiveSizes = {
  render: () => renderBlock(responsiveSizes),
};
