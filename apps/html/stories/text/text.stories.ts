import base from './fragments/base.html?raw';
import bodyScales from './fragments/body-scales.html?raw';
import headingDisplayScales from './fragments/heading-display-scales.html?raw';
import headingSansScales from './fragments/heading-sans-scales.html?raw';
import headingSerifScales from './fragments/heading-serif-scales.html?raw';
import presets from './fragments/presets.html?raw';
import subheadingSansScales from './fragments/subheading-sans-scales.html?raw';
import utilitySansScales from './fragments/utility-sans-scales.html?raw';
import utilitySerifScales from './fragments/utility-serif-scales.html?raw';

export default {
  title: 'Typography/Text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'CdrText wraps text elements with default type styles and spacing; presets map to Cedar typography for headings, subheadings, body, utility, and eyebrow.',
      },
    },
  },
};

export const Base = {
  render: () => base,
};

export const Presets = {
  render: () => presets,
};

export const HeadingDisplayScales = {
  render: () => headingDisplayScales,
};

export const HeadingSansScales = {
  render: () => headingSansScales,
};

export const HeadingSerifScales = {
  render: () => headingSerifScales,
};

export const SubheadingSansScales = {
  render: () => subheadingSansScales,
};

export const BodyScales = {
  render: () => bodyScales,
};

export const UtilitySansScales = {
  render: () => utilitySansScales,
};

export const UtilitySerifScales = {
  render: () => utilitySerifScales,
};
