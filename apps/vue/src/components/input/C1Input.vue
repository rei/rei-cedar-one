<template>
  <div :class="rootClasses">
    <div class="cdr-label-standalone__label-wrapper">
      <label :class="labelClasses" :for="inputAttrs.id">
        {{ label }}
        <span v-if="required" aria-hidden="true">*</span>
        <span v-else-if="optional" class="cdr-label-standalone__optional"
          >(optional)</span
        >
      </label>
      <br v-if="!hideLabel && hasHelperTop" />
      <span
        v-if="hasHelperTop"
        class="cdr-label-standalone__helper"
        :id="helperTopId"
      >
        <slot name="helper-text-top" />
      </span>
    </div>

    <div :class="['cdr-label-standalone__input-wrap', inputSpacingClass]">
      <div :class="wrapClasses">
        <textarea
          v-if="isMultiline"
          ref="inputRef"
          v-bind="textareaAttrs"
          :class="inputClasses"
          :rows="rows"
          @focus="onFocus"
          @blur="onBlur"
          v-model="inputModel"
        ></textarea>
        <input
          v-else
          ref="inputRef"
          v-bind="inputBaseAttrs"
          :class="inputClasses"
          @focus="onFocus"
          @blur="onBlur"
          v-model="inputModel"
        />
        <span v-if="hasPreIcon" class="cdr-input__pre-icon">
          <slot name="pre-icon" />
        </span>
        <span v-if="hasPostIcon" class="cdr-input__post-icon">
          <slot name="post-icon" />
        </span>
      </div>
      <div v-if="hasInfoAction" class="cdr-label-standalone__info-action">
        <slot name="info-action" />
      </div>
    </div>

    <span v-if="hasInfo" class="cdr-label-standalone__info">
      <slot name="info" />
    </span>

    <div class="cdr-label-standalone__post-content">
      <span
        v-if="hasHelperBottom && !showError"
        class="cdr-input__helper-text"
        :id="helperBottomId"
      >
        <slot name="helper-text-bottom" />
      </span>
      <div
        :class="['cdr-form-error', showError ? '--active-error' : '']"
        :id="errorId"
      >
        <span v-show="showError" class="cdr-form-error__icon">
          <C1IconInformationStroke
            aria-hidden="true"
            focusable="false"
            inherit-color
          />
        </span>
        <div :role="errorRole" aria-atomic="true" aria-relevant="all">
          <div v-if="showError">
            <slot name="error">{{ errorMessage }}</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { C1IconInformationStroke } from '@rei/c1-icons/vue';
import { computed, ref, useAttrs, useSlots } from 'vue';

import { useInputAdapter } from '@rei/c1-ui/adapters/input/vue';
import { c1InputProps, type InputAdapterState } from './C1Input.types';

defineOptions({
  name: 'C1Input',
  inheritAttrs: false,
});

const props = defineProps(c1InputProps);

const emit = defineEmits({
  'update:modelValue': null,
});

const slots = useSlots();
const attrs = useAttrs();
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);

const hasHelperTop = computed(() => Boolean(slots['helper-text-top']));
const hasHelperBottom = computed(() => Boolean(slots['helper-text-bottom']));
const hasPreIcon = computed(() => Boolean(slots['pre-icon']));
const hasPostIcon = computed(() => Boolean(slots['post-icon']));
const hasPostIcons = computed(() => props.postIcons && hasPostIcon.value);
const hasInfo = computed(() => Boolean(slots.info));
const hasInfoAction = computed(() => Boolean(slots['info-action']));
const isMultiline = computed(() => props.rows > 1);

const inputSpacingClass = computed(() =>
  !props.hideLabel || hasHelperTop.value || hasInfo.value
    ? 'cdr-label-standalone__input-spacing'
    : '',
);

const rootClasses = computed(() =>
  ['cdr-label-standalone', props.inputContainerClass].filter(Boolean).join(' '),
);

const labelClasses = computed(() =>
  [
    'cdr-label-standalone__label',
    props.disabled ? 'cdr-label-standalone__label--disabled' : '',
    props.hideLabel ? 'cdr-label-standalone__label--sr-only' : '',
    props.labelClass,
  ]
    .filter(Boolean)
    .join(' '),
);

const state = computed<InputAdapterState>(() => ({
  id: props.id,
  type: props.type,
  numeric: props.numeric,
  rows: props.rows,
  background: props.background,
  size: props.size,
  error: props.error,
  required: props.required,
  optional: props.optional,
  hasHelperTop: hasHelperTop.value,
  hasHelperBottom: hasHelperBottom.value,
  hasPreIcon: hasPreIcon.value,
  hasPostIcon: hasPostIcon.value,
  hasPostIcons: hasPostIcons.value,
  describedBy: attrs['aria-describedby'] as string | undefined,
}));

const {
  inputAttrs,
  inputClasses,
  wrapClasses,
  helperTopId,
  helperBottomId,
  errorId,
  onFocus,
  onBlur,
} = useInputAdapter({
  state,
  inputRef,
});

const inputBaseAttrs = computed(() => ({
  ...attrs,
  ...inputAttrs.value,
  autocomplete: 'off',
  disabled: props.disabled || undefined,
}));

const textareaAttrs = computed(() => {
  const nextAttrs = { ...inputBaseAttrs.value } as Record<string, unknown>;
  delete nextAttrs.type;
  return nextAttrs;
});

const showError = computed(() => Boolean(props.error));
const errorMessage = computed(() =>
  typeof props.error === 'string' ? props.error : '',
);

const inputModel = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>
