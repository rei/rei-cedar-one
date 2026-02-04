<template>
  <div ref="groupRef" class="cdr-accordion-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import { createAccordionGroupAdapter } from '@rei/c1-ui/adapters/accordion';
import { accordionUnwrapKey } from '../accordion/accordionContext';

import {
  c1AccordionGroupProps,
  type AccordionGroupAdapterState,
} from './C1AccordionGroup.types';

defineOptions({
  name: 'C1AccordionGroup',
});

const props = defineProps(c1AccordionGroupProps);
const groupRef = ref<HTMLElement | null>(null);
let adapter: ReturnType<typeof createAccordionGroupAdapter> | null = null;
let resizeHandler: (() => void) | null = null;

const readBreakpoint = (name: string, fallback: number): number => {
  if (typeof window === 'undefined') return fallback;
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getCurrentBreakpoint = (): string => {
  if (typeof window === 'undefined') return 'xs';
  const width = window.innerWidth;
  const sm = readBreakpoint('--cdr-breakpoint-sm', 768);
  const md = readBreakpoint('--cdr-breakpoint-md', 992);
  const lg = readBreakpoint('--cdr-breakpoint-lg', 1232);
  if (width >= sm && width < md) return 'sm';
  if (width >= md && width < lg) return 'md';
  if (width >= lg) return 'lg';
  return 'xs';
};

const resolveUnwrapped = (value: boolean | string): boolean => {
  if (typeof value === 'string') {
    return value.indexOf(getCurrentBreakpoint()) !== -1;
  }
  return Boolean(value);
};

const unwrapped = ref(resolveUnwrapped(props.unwrap));

const applyUnwrapped = (): void => {
  unwrapped.value = resolveUnwrapped(props.unwrap);
  adapter?.update({ unwrap: unwrapped.value } as AccordionGroupAdapterState);
};

const removeResizeHandler = (): void => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
};

const registerResizeHandler = (): void => {
  removeResizeHandler();
  if (typeof window === 'undefined') return;
  if (typeof props.unwrap !== 'string') return;
  let resizeTimeout: number | null = null;
  resizeHandler = () => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      resizeTimeout = null;
      applyUnwrapped();
    }, 300);
  };
  window.addEventListener('resize', resizeHandler);
};

provide(accordionUnwrapKey, unwrapped);

onMounted(() => {
  if (!groupRef.value) return;
  applyUnwrapped();
  adapter = createAccordionGroupAdapter({
    element: groupRef.value,
    unwrap: unwrapped.value,
  });
  registerResizeHandler();
});

watch(
  () => props.unwrap,
  () => {
    applyUnwrapped();
    registerResizeHandler();
  },
);

onBeforeUnmount(() => {
  removeResizeHandler();
  adapter?.destroy();
  adapter = null;
});
</script>
