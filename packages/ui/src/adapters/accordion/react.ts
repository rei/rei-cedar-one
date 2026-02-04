import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

import {
  createAccordionAdapter,
  type AccordionAdapterInstance,
  type AccordionAdapterOptions,
  type AccordionAdapterRefs,
  type AccordionAdapterState,
} from './index';

export type UseAccordionAdapterRefs = {
  root: RefObject<HTMLElement | null>;
  trigger: RefObject<HTMLElement | null>;
  contentContainer: RefObject<HTMLElement | null>;
  content: RefObject<HTMLElement | null>;
  header?: RefObject<HTMLElement | null>;
  label?: RefObject<HTMLElement | null>;
  icon?: RefObject<HTMLElement | null>;
};

export type UseAccordionAdapterOptions = {
  refs: UseAccordionAdapterRefs;
  state: AccordionAdapterState;
  adapterOptions?: AccordionAdapterOptions;
};

export type UseAccordionAdapterReturn = {
  adapter: RefObject<AccordionAdapterInstance | null>;
  update: (nextState?: AccordionAdapterState) => void;
  destroy: () => void;
};

const resolveRefs = (refs: UseAccordionAdapterRefs): AccordionAdapterRefs => {
  const root = refs.root.current;
  const trigger = refs.trigger.current;
  const contentContainer = refs.contentContainer.current;
  const content = refs.content.current;
  if (!root || !trigger || !contentContainer || !content) {
    throw new Error(
      'useAccordionAdapter: root, trigger, contentContainer, and content refs are required.',
    );
  }
  return {
    root,
    trigger,
    contentContainer,
    content,
    header: refs.header?.current ?? null,
    label: refs.label?.current ?? null,
    icon: refs.icon?.current ?? null,
  };
};

/**
 * React hook that wires the accordion adapter to DOM refs.
 * @param options - Refs, optional state, and adapter options.
 * @returns Adapter handle with update/destroy helpers.
 */
export const useAccordionAdapter = (
  options: UseAccordionAdapterOptions,
): UseAccordionAdapterReturn => {
  const { refs, state, adapterOptions = {} } = options;
  const adapter = useRef<AccordionAdapterInstance | null>(null);

  useLayoutEffect(() => {
    adapter.current = createAccordionAdapter(
      resolveRefs(refs),
      state,
      adapterOptions,
    );
    return () => {
      adapter.current?.destroy();
      adapter.current = null;
    };
  }, [refs, adapterOptions]);

  useEffect(() => {
    adapter.current?.update(state);
  }, [state]);

  return {
    adapter,
    update: (nextState?: AccordionAdapterState) => {
      adapter.current?.update(nextState);
    },
    destroy: () => {
      adapter.current?.destroy();
    },
  };
};
