<template>
  <div ref="rootRef" :class="rootClasses">
    <component :is="headingTag" ref="headerRef" :class="headerClass">
      <component
        :is="triggerTag"
        ref="triggerRef"
        :type="triggerType"
        :class="triggerClass"
        v-bind="triggerAttrs"
      >
        <span ref="labelRef" class="cdr-accordion__label" v-bind="labelAttrs">
          <slot name="label">{{ label }}</slot>
        </span>
        <span
          v-if="!isUnwrapped"
          ref="iconRef"
          :class="iconClasses"
          aria-hidden="true"
        >
          <C1IconCaretDown
            aria-hidden="true"
            focusable="false"
            inherit-color
            :size="compact ? 'small' : undefined"
          />
        </span>
      </component>
    </component>

    <div ref="contentContainerRef" :class="containerClasses">
      <div ref="contentRef" :class="contentClasses" v-bind="contentAttrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { C1IconCaretDown } from '@rei/c1-icons/vue';
import { useAccordionAdapter } from '@rei/c1-ui/adapters/accordion/vue';
import {
  c1AccordionProps,
  type AccordionAdapterState,
} from './C1Accordion.types';
import { accordionUnwrapKey } from './accordionContext';

defineOptions({
  name: 'C1Accordion',
});

const props = defineProps(c1AccordionProps);

const emit = defineEmits({
  'accordion-toggle': null,
});

const rootRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const labelRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const contentContainerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const injectedUnwrap = inject(accordionUnwrapKey, ref(false));
const isUnwrapped = computed(() => injectedUnwrap.value);
const isOpen = computed(() => props.opened || isUnwrapped.value);
const headingTag = computed(() => `h${props.level}`);
const headerClass = computed(() =>
  isUnwrapped.value
    ? 'cdr-accordion__header--unwrapped'
    : 'cdr-accordion__header',
);
const triggerTag = computed(() => (isUnwrapped.value ? 'div' : 'button'));
const triggerType = computed(() => (isUnwrapped.value ? undefined : 'button'));
const triggerClass = computed(() =>
  isUnwrapped.value
    ? 'js-cdr-accordion-button'
    : 'cdr-accordion__button js-cdr-accordion-button',
);

const rootClasses = computed(() =>
  [
    'cdr-accordion',
    props.compact && 'cdr-accordion--compact',
    props.borderAligned && 'cdr-accordion--border-aligned',
    !props.contentSpacing && 'cdr-accordion--no-spacing',
    isUnwrapped.value && 'cdr-accordion--unwrap',
  ]
    .filter(Boolean)
    .join(' '),
);

const iconClasses = computed(() =>
  [
    'cdr-accordion__icon',
    isOpen.value ? 'cdr-accordion--open' : 'cdr-accordion--closed',
  ]
    .filter(Boolean)
    .join(' '),
);

const containerClasses = computed(() =>
  [
    'cdr-accordion__content-container',
    isOpen.value ? 'cdr-accordion--open' : 'cdr-accordion--closed',
    isUnwrapped.value && 'cdr-accordion--unwrap',
  ]
    .filter(Boolean)
    .join(' '),
);

const contentClasses = computed(() =>
  [
    'cdr-accordion__content',
    isOpen.value ? 'cdr-accordion--open' : 'cdr-accordion--closed',
    isUnwrapped.value && 'cdr-accordion--unwrap',
  ]
    .filter(Boolean)
    .join(' '),
);

const triggerAttrs = computed(() => ({
  id: props.id,
  'aria-expanded': !isUnwrapped.value ? props.opened : undefined,
  'aria-controls': !isUnwrapped.value ? `${props.id}-collapsible` : undefined,
}));

const labelAttrs = computed(() => ({
  id: `${props.id}-label`,
}));

const contentAttrs = computed(() => ({
  id: `${props.id}-collapsible`,
  'aria-hidden': !isUnwrapped.value ? !props.opened : undefined,
}));

const state = computed<AccordionAdapterState>(() => ({
  id: props.id,
  opened: props.opened,
  unwrapped: isUnwrapped.value,
}));

useAccordionAdapter({
  refs: {
    root: rootRef,
    header: headerRef,
    trigger: triggerRef,
    label: labelRef,
    icon: iconRef,
    contentContainer: contentContainerRef,
    content: contentRef,
  },
  state,
  adapterOptions: {
    autoToggle: false,
    onToggle: (_nextOpen: boolean, event: Event) =>
      emit('accordion-toggle', event),
  },
});
</script>
