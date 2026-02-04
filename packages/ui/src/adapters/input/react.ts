import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';

import {
  computeInputState,
  type InputAdapterState,
  type InputComputedState,
  type ResolvedInputState,
} from './index';

let inputIdCounter = 0;

const nextInputId = (): string => `cdr-input-${++inputIdCounter}`;

export type UseInputAdapterOptions = {
  state: InputAdapterState;
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
};

export type UseInputAdapterReturn = {
  resolvedState: ResolvedInputState;
  computedState: InputComputedState;
  inputAttrs: InputComputedState['inputAttrs'];
  inputClasses: InputComputedState['inputClasses'];
  wrapClasses: InputComputedState['wrapClasses'];
  helperTopId: InputComputedState['helperTopId'];
  helperBottomId: InputComputedState['helperBottomId'];
  errorId: InputComputedState['errorId'];
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
};

/**
 * React hook that mirrors the input adapter compute layer.
 * Use this in React components to bind attrs/classes and focus handlers.
 * @param options - Adapter state and optional input ref.
 * @returns Computed bindings and focus handlers.
 */
export const useInputAdapter = (
  options: UseInputAdapterOptions,
): UseInputAdapterReturn => {
  const { state, inputRef } = options;
  const [isFocused, setIsFocused] = useState(false);
  const fallbackIdRef = useRef<string | undefined>(undefined);

  const resolvedState = useMemo<ResolvedInputState>(() => {
    const input = inputRef?.current ?? null;
    const id =
      state.id ||
      input?.id ||
      fallbackIdRef.current ||
      (fallbackIdRef.current = nextInputId());
    const background = state.background || 'primary';
    const type =
      state.type || (input instanceof HTMLInputElement ? input.type : 'text');

    return {
      ...state,
      id,
      background,
      type,
    };
  }, [state, inputRef]);

  const computedState = useMemo(
    () =>
      computeInputState({
        ...resolvedState,
        isFocused,
      }),
    [resolvedState, isFocused],
  );

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    resolvedState,
    computedState,
    inputAttrs: computedState.inputAttrs,
    inputClasses: computedState.inputClasses,
    wrapClasses: computedState.wrapClasses,
    helperTopId: computedState.helperTopId,
    helperBottomId: computedState.helperBottomId,
    errorId: computedState.errorId,
    onFocus,
    onBlur,
    isFocused,
  };
};
