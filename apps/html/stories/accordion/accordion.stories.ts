import {
  createAccordionAdapterFromElement,
  createAccordionGroupAdapter,
} from '../../../../packages/ui/src/adapters/accordion';

import base from './fragments/base.html?raw';
import borderAligned from './fragments/border-aligned.html?raw';
import compact from './fragments/compact.html?raw';
import group from './fragments/group.html?raw';
import noSpacing from './fragments/no-spacing.html?raw';
import unwrapped from './fragments/unwrapped.html?raw';

const renderBlock = (content: string) => `
  <div class="c1-story-grid c1-story-gap-16 c1-story-max-680">
    ${content}
  </div>
`;

const attachAccordionAdapters = (canvasElement: HTMLElement): void => {
  const adapterOptions = { autoToggle: true };
  canvasElement
    .querySelectorAll<HTMLElement>('.cdr-accordion-group')
    .forEach((groupElement) => {
      const unwrap = groupElement.getAttribute('data-unwrap');
      const parsedUnwrap =
        unwrap === 'true'
          ? true
          : unwrap === 'false'
            ? false
            : (unwrap ?? false);
      createAccordionGroupAdapter({
        element: groupElement,
        unwrap: parsedUnwrap,
        accordionAdapterOptions: adapterOptions,
      });
    });

  canvasElement
    .querySelectorAll<HTMLElement>('.cdr-accordion, .cdr-accordion--unwrap')
    .forEach((accordion) => {
      if (accordion.closest('.cdr-accordion-group')) return;
      createAccordionAdapterFromElement({
        element: accordion,
        adapterOptions,
      });
    });
};

const createAccordionStory = (content: string) => {
  const rendered = renderBlock(content);

  return {
    render: () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = rendered;
      attachAccordionAdapters(wrapper);
      return wrapper;
    },
    parameters: {
      docs: {
        source: {
          code: rendered,
          language: 'html',
        },
      },
    },
  };
};

export default {
  title: 'HTML/Disclosure/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accordions reveal supplemental content within the same layout, making it easy to show related details without navigating away.',
      },
    },
  },
};

export const Base = createAccordionStory(base);
export const Group = createAccordionStory(group);
export const BorderAligned = createAccordionStory(borderAligned);
export const Compact = createAccordionStory(compact);
export const NoContentSpacing = createAccordionStory(noSpacing);
export const Unwrapped = createAccordionStory(unwrapped);
