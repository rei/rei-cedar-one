import { computed, ref, unref, type ComputedRef, type Ref } from 'vue';

import {
  computeInputState,
  type InputAdapterState,
  type InputComputedState,
  type ResolvedInputState,
} from './index';

let inputIdCounter = 0;

const nextInputId = (): string => `cdr-input-${++inputIdCounter}`;

export type UseInputAdapterOptions = {
  state: InputAdapterState | Ref<InputAdapterState>;
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement | null>;
};

export type UseInputAdapterReturn = {
  resolvedState: ComputedRef<ResolvedInputState>;
  computedState: ComputedRef<InputComputedState>;
  inputAttrs: ComputedRef<InputComputedState['inputAttrs']>;
  inputClasses: ComputedRef<InputComputedState['inputClasses']>;
  wrapClasses: ComputedRef<InputComputedState['wrapClasses']>;
  helperTopId: ComputedRef<InputComputedState['helperTopId']>;
  helperBottomId: ComputedRef<InputComputedState['helperBottomId']>;
  errorId: ComputedRef<InputComputedState['errorId']>;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: Ref<boolean>;
};

/**
 * Vue composable that mirrors the input adapter compute layer.
 * Use this in Vue templates to bind attrs/classes and focus handlers.
 * @param options - Reactive state and optional input ref.
 * @returns Computed bindings and focus handlers.
 */
export const useInputAdapter = (
  options: UseInputAdapterOptions,
): UseInputAdapterReturn => {
  const { state, inputRef } = options;
  const isFocused = ref(false);
  const fallbackId = ref<string | undefined>(undefined);
  const resolvedState = computed<ResolvedInputState>(() => {
    const nextState = unref(state);
    const input = inputRef ? unref(inputRef) : null;
    const id =
      nextState.id ||
      input?.id ||
      fallbackId.value ||
      (fallbackId.value = nextInputId());
    const background = nextState.background || 'primary';
    const type =
      nextState.type ||
      (input instanceof HTMLInputElement ? input.type : 'text');

    return {
      ...nextState,
      id,
      background,
      type,
    };
  });

  const computedState = computed(() =>
    computeInputState({
      ...resolvedState.value,
      isFocused: isFocused.value,
    }),
  );

  return {
    resolvedState,
    computedState,
    inputAttrs: computed(() => computedState.value.inputAttrs),
    inputClasses: computed(() => computedState.value.inputClasses),
    wrapClasses: computed(() => computedState.value.wrapClasses),
    helperTopId: computed(() => computedState.value.helperTopId),
    helperBottomId: computed(() => computedState.value.helperBottomId),
    errorId: computed(() => computedState.value.errorId),
    onFocus: () => {
      isFocused.value = true;
    },
    onBlur: () => {
      isFocused.value = false;
    },
    isFocused,
  };
};
