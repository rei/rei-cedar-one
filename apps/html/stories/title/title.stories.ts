import base from './fragments/base.html?raw';
import containerQueryGrid from './fragments/container-query-grid.html?raw';
import responsiveContainer from './fragments/responsive-container.html?raw';
import withKickerAndAbstract from './fragments/with-kicker-and-abstract.html?raw';

const renderStack = (content: string) => `
  <div class="c1-story-grid c1-story-gap-12 c1-story-max-60ch">
    ${content}
  </div>
`;

export default {
  title: 'HTML/Typography/Title',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Titles name a content object (like a product or article) and scale fluidly using container queries so the same title adapts across layouts.',
      },
    },
  },
};

export const Base = {
  render: () => base,
};

export const WithKickerAndAbstract = {
  render: () => renderStack(withKickerAndAbstract),
};

export const ResponsiveContainer = {
  render: () => responsiveContainer,
};

export const ContainerQueryGrid = {
  render: () => containerQueryGrid,
};
