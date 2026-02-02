import base from './fragments/base.html?raw';
import constrainedContainer from './fragments/constrained-container.html?raw';
import withKickerAndTitle from './fragments/with-kicker-and-title.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:70ch;">
    ${content}
  </div>
`;

export default {
  title: 'Typography/Abstract',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Abstracts summarize a content composition and use atomic-content typography that adapts to their container.',
      },
    },
  },
};

export const Base = {
  render: () => renderBlock(base),
};

export const WithKickerAndTitle = {
  render: () => renderBlock(withKickerAndTitle),
};

export const ConstrainedContainer = {
  render: () => renderBlock(constrainedContainer),
};
