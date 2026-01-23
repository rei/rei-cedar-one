<template>
  <button :class="classes" :disabled="disabled" :aria-label="ariaLabel">
    <span
      v-if="iconLeft && !iconOnly"
      class="cedar-btn__icon"
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          role="presentation"
          d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm6.762 7a7.073 7.073 0 00-13.524 0h13.524zM4 21a1 1 0 01-1-1h-.008a9.08 9.08 0 01.02-.159 9.08 9.08 0 015.454-7.127 5.5 5.5 0 117.068 0A9.08 9.08 0 0121.008 20H21a1 1 0 01-1 1H4z"
        />
      </svg>
    </span>
    <span v-if="!iconOnly">{{ label }}</span>
    <span
      v-if="iconRight && !iconOnly"
      class="cedar-btn__icon"
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          role="presentation"
          d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm6.762 7a7.073 7.073 0 00-13.524 0h13.524zM4 21a1 1 0 01-1-1h-.008a9.08 9.08 0 01.02-.159 9.08 9.08 0 015.454-7.127 5.5 5.5 0 117.068 0A9.08 9.08 0 0121.008 20H21a1 1 0 01-1 1H4z"
        />
      </svg>
    </span>
    <span v-if="iconOnly" class="cedar-btn__icon" aria-hidden="true">
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          role="presentation"
          d="M12 12a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm6.762 7a7.073 7.073 0 00-13.524 0h13.524zM4 21a1 1 0 01-1-1h-.008a9.08 9.08 0 01.02-.159 9.08 9.08 0 015.454-7.127 5.5 5.5 0 117.068 0A9.08 9.08 0 0121.008 20H21a1 1 0 01-1 1H4z"
        />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

type Size = 'small' | 'medium' | 'large';
type Variant = 'primary' | 'secondary' | 'dark' | 'sale' | 'link';

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: Size;
    variant?: Variant;
    fullWidth?: boolean;
    iconLeft?: boolean;
    iconRight?: boolean;
    iconOnly?: boolean;
    iconOnlySize?: Size | '';
    withBackground?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
  }>(),
  {
    label: 'Button',
    size: 'medium',
    variant: 'primary',
    fullWidth: false,
    iconLeft: false,
    iconRight: false,
    iconOnly: false,
    iconOnlySize: '',
    withBackground: false,
    disabled: false,
    ariaLabel: 'Icon only',
  },
);

const {
  label,
  size,
  variant,
  fullWidth,
  iconLeft,
  iconRight,
  iconOnly,
  iconOnlySize,
  withBackground,
  disabled,
  ariaLabel,
} = toRefs(props);

const classes = computed(() => {
  const sizeClass = `cedar-btn--${size.value}`;
  const resolvedIconOnlySize = iconOnlySize.value || size.value;

  return [
    'cedar-btn',
    `cedar-btn--${variant.value}`,
    iconOnly.value ? 'cedar-btn--icon-only' : '',
    iconOnly.value ? `cedar-btn--icon-only-${resolvedIconOnlySize}` : sizeClass,
    fullWidth.value && !iconOnly.value ? 'cedar-btn--full-width' : '',
    iconLeft.value && !iconOnly.value ? 'cedar-btn--has-icon-left' : '',
    iconRight.value && !iconOnly.value ? 'cedar-btn--has-icon-right' : '',
    withBackground.value && iconOnly.value ? 'cedar-btn--with-background' : '',
  ]
    .filter(Boolean)
    .join(' ');
});
</script>
