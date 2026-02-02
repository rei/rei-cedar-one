<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({ name: 'C1Icon' });

type IconSize = string;

const props = defineProps<{
  name?: string;
  use?: string;
  inheritColor?: boolean;
  size?: IconSize;
}>();

const attrs = useAttrs();
const hideSr = computed(
  () => !attrs['aria-label'] && !attrs['aria-labelledby'],
);
const sizeClass = computed(() => {
  if (!props.size) return undefined;
  return props.size
    .split(' ')
    .filter(Boolean)
    .map((token) => `cdr-icon--${token}`)
    .join(' ');
});
const classes = computed(() => [
  'cdr-icon',
  sizeClass.value,
  (props.inheritColor ?? false) && 'cdr-icon--inherit-color',
]);
const href = computed(() => {
  if (props.use) return props.use;
  if (props.name) return `#${props.name}`;
  return undefined;
});
</script>

<template>
  <svg
    v-bind="attrs"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :aria-hidden="hideSr ? 'true' : undefined"
  >
    <slot />
    <use v-if="href" :href="href" :xlink:href="href" />
  </svg>
</template>
