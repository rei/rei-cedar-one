import componentMix from './fragments/component-mix.html?raw';
import contentTypes from './fragments/content-types.html?raw';
import darkSurface from './fragments/dark-surface.html?raw';
import editorial from './fragments/editorial.html?raw';
import escapeHatch from './fragments/escape-hatch.html?raw';
import invert from './fragments/invert.html?raw';
import measuredLineLength from './fragments/measured-line-length.html?raw';
import overview from './fragments/overview.html?raw';
import responsiveMeasure from './fragments/responsive-measure.html?raw';
import serifHeadings from './fragments/serif-headings.html?raw';
import sizes from './fragments/sizes.html?raw';

export default {
  title: 'HTML/Typography/Prose',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Prose styles provide readable defaults for rich text and CMS content, aligning with Cedar typography guidance and spacing.',
      },
    },
  },
};

export const Overview = {
  render: () => overview,
};

export const Sizes = {
  render: () => sizes,
};

export const MeasuredLineLength = {
  render: () => measuredLineLength,
};

export const SerifHeadings = {
  render: () => serifHeadings,
};

export const Invert = {
  render: () => invert,
};

export const EscapeHatch = {
  render: () => escapeHatch,
};

export const ContentTypes = {
  render: () => contentTypes,
};

export const ComponentMix = {
  render: () => componentMix,
};

export const Editorial = {
  render: () => editorial,
};

export const ResponsiveMeasure = {
  render: () => responsiveMeasure,
};

export const DarkSurface = {
  render: () => darkSurface,
};
