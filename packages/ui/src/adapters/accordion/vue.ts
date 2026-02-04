import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  unref,
  watch,
  type Ref,
  type ShallowRef,
} from 'vue';

import {
  createAccordionAdapter,
  type AccordionAdapterInstance,
  type AccordionAdapterOptions,
  type AccordionAdapterRefs,
  type AccordionAdapterState,
} from './index';

export type UseAccordionAdapterRefs = {
  root: Ref<HTMLElement | null>;
  trigger: Ref<HTMLElement | null>;
  contentContainer: Ref<HTMLElement | null>;
  content: Ref<HTMLElement | null>;
  header?: Ref<HTMLElement | null>;
  label?: Ref<HTMLElement | null>;
  icon?: Ref<HTMLElement | null>;
};

export type UseAccordionAdapterOptions = {
  refs: UseAccordionAdapterRefs;
  state: AccordionAdapterState | Ref<AccordionAdapterState>;
  adapterOptions?: AccordionAdapterOptions;
};

export type UseAccordionAdapterReturn = {
  adapter: ShallowRef<AccordionAdapterInstance | null>;
  update: (nextState?: AccordionAdapterState) => void;
  destroy: () => void;
};

const resolveRefs = (refs: UseAccordionAdapterRefs): AccordionAdapterRefs => {
  const root = unref(refs.root);
  const trigger = unref(refs.trigger);
  const contentContainer = unref(refs.contentContainer);
  const content = unref(refs.content);
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
    header: refs.header ? unref(refs.header) : null,
    label: refs.label ? unref(refs.label) : null,
    icon: refs.icon ? unref(refs.icon) : null,
  };
};

/**
 * Vue composable that wires the accordion adapter to DOM refs.
 * @param options - Refs, optional state, and adapter options.
 * @returns Adapter handle with update/destroy helpers.
 */
export const useAccordionAdapter = (
  options: UseAccordionAdapterOptions,
): UseAccordionAdapterReturn => {
  const { refs, state, adapterOptions = {} } = options;
  const adapter = shallowRef<AccordionAdapterInstance | null>(null);

  onMounted(() => {
    adapter.value = createAccordionAdapter(
      resolveRefs(refs),
      unref(state),
      adapterOptions,
    );
  });

  watch(
    () => unref(state),
    (nextState) => {
      adapter.value?.update(nextState);
    },
    { deep: true },
  );

  onBeforeUnmount(() => {
    adapter.value?.destroy();
  });

  return {
    adapter,
    update: (nextState?: AccordionAdapterState) => {
      adapter.value?.update(nextState);
    },
    destroy: () => {
      adapter.value?.destroy();
    },
  };
};
