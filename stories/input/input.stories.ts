import { createInputAdapterFromElement } from '../../packages/ui/src/adapters/input';

import base from './fragments/base.html?raw';
import date from './fragments/date.html?raw';
import error from './fragments/error.html?raw';
import helperTextBottom from './fragments/helper-text-bottom.html?raw';
import helperTextTop from './fragments/helper-text-top.html?raw';
import large from './fragments/large.html?raw';
import multiline from './fragments/multiline.html?raw';
import postIcon from './fragments/post-icon.html?raw';
import postIcons from './fragments/post-icons.html?raw';
import preIcon from './fragments/pre-icon.html?raw';
import secondaryBackground from './fragments/secondary-background.html?raw';

const renderBlock = (content: string) => `
  <div style="display:grid;gap:16px;max-width:520px;">
    ${content}
  </div>
`;

const attachInputAdapters = (canvasElement: HTMLElement): void => {
  const wraps = Array.from(
    canvasElement.querySelectorAll<HTMLElement>('.cdr-input-wrap'),
  );

  wraps.forEach((wrap) => {
    createInputAdapterFromElement({ element: wrap });
  });
};

const createInputStory = (content: string) => {
  const rendered = renderBlock(content);

  return {
    render: () => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = rendered;
      attachInputAdapters(wrapper);
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
  title: 'Forms/Input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inputs support freeform data entry and search. Use them for open-ended responses; use select when options are predefined.',
      },
    },
  },
};

// Base
export const Base = createInputStory(base);

// Helpers + error
export const HelperTextTop = createInputStory(helperTextTop);
export const HelperTextBottom = createInputStory(helperTextBottom);
export const Error = createInputStory(error);

// Icons
export const PreIcon = createInputStory(preIcon);
export const PostIcon = createInputStory(postIcon);
export const PostIcons = createInputStory(postIcons);

// Variants
export const SecondaryBackground = createInputStory(secondaryBackground);
export const Large = createInputStory(large);

// Field types
export const Multiline = createInputStory(multiline);
export const Date = createInputStory(date);
