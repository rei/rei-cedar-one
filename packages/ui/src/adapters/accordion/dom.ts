import type {
  AccordionAdapterElementOptions,
  AccordionAdapterState,
} from './types';
import { createAccordionAdapter } from './core';

const OPEN_CLASS = 'cdr-accordion--open';
const UNWRAP_CLASS = 'cdr-accordion--unwrap';

/**
 * Create an accordion adapter by resolving refs from an element.
 * The element can be a `.cdr-accordion` or any child inside it.
 * @param options - Element and optional initial state.
 * @returns Adapter instance with update/destroy APIs.
 */
export const createAccordionAdapterFromElement = (
  options: AccordionAdapterElementOptions,
) => {
  const { element, initialState = {}, adapterOptions } = options;
  const isAccordionRoot =
    element.classList.contains('cdr-accordion') ||
    element.classList.contains(UNWRAP_CLASS);
  const root =
    isAccordionRoot && element instanceof HTMLElement
      ? element
      : (element.closest<HTMLElement>(`.cdr-accordion, .${UNWRAP_CLASS}`) ??
        element.querySelector<HTMLElement>(`.cdr-accordion, .${UNWRAP_CLASS}`));

  if (!root) {
    throw new Error(
      'createAccordionAdapterFromElement: could not find .cdr-accordion root.',
    );
  }

  const header = root.querySelector<HTMLElement>('.cdr-accordion__header');
  const trigger =
    root.querySelector<HTMLElement>('.cdr-accordion__button') ??
    root.querySelector<HTMLElement>('.js-cdr-accordion-button');
  const label = root.querySelector<HTMLElement>('.cdr-accordion__label');
  const icon = root.querySelector<HTMLElement>('.cdr-accordion__icon');
  const contentContainer = root.querySelector<HTMLElement>(
    '.cdr-accordion__content-container',
  );
  const content = root.querySelector<HTMLElement>('.cdr-accordion__content');

  if (!trigger || !contentContainer || !content) {
    throw new Error(
      'createAccordionAdapterFromElement: missing trigger or content elements.',
    );
  }

  const derivedOpen =
    trigger.getAttribute('aria-expanded') === 'true' ||
    content.classList.contains(OPEN_CLASS) ||
    contentContainer.classList.contains(OPEN_CLASS);

  const derivedState: AccordionAdapterState = {
    opened: initialState.opened ?? derivedOpen,
    unwrapped: initialState.unwrapped ?? root.classList.contains(UNWRAP_CLASS),
  };

  return createAccordionAdapter(
    {
      root,
      header,
      trigger,
      label,
      icon,
      contentContainer,
      content,
    },
    derivedState,
    adapterOptions,
  );
};
