import type {
  InputAdapterElementOptions,
  InputAdapterInstance,
  InputAdapterState,
} from './types';

import { createInputAdapter } from './core';

/**
 * Create an adapter by resolving refs from an element.
 * The element can be a `.cdr-label-standalone`, `.cdr-input-wrap`, or the input itself.
 * @param options - Element and optional initial state.
 * @returns Adapter instance with update/destroy APIs.
 */
export const createInputAdapterFromElement = (
  options: InputAdapterElementOptions,
): InputAdapterInstance => {
  const { element, initialState = {} } = options;

  const isInputElement =
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement;
  const wrap =
    element.classList?.contains('cdr-input-wrap') &&
    element instanceof HTMLElement
      ? element
      : element.querySelector<HTMLElement>('.cdr-input-wrap');
  const input =
    (isInputElement
      ? (element as HTMLInputElement | HTMLTextAreaElement)
      : wrap?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          'input, textarea',
        )) ??
    element.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea',
    );

  if (!input) {
    throw new Error(
      'createInputAdapterFromElement: could not find input or textarea element.',
    );
  }

  const resolvedWrap =
    wrap ?? (input.closest('.cdr-input-wrap') as HTMLElement | null);

  if (!resolvedWrap) {
    throw new Error(
      'createInputAdapterFromElement: could not find .cdr-input-wrap.',
    );
  }

  const scope =
    resolvedWrap.closest<HTMLElement>('.cdr-label-standalone') ?? element;

  const helperTop = scope.querySelector<HTMLElement>(
    '.cdr-label-standalone__helper',
  );
  const helperBottom = scope.querySelector<HTMLElement>(
    '.cdr-input__helper-text',
  );
  const error = scope.querySelector<HTMLElement>('.cdr-form-error');
  const preIcon = resolvedWrap.querySelector<HTMLElement>(
    '.cdr-input__pre-icon',
  );
  const postIcon = resolvedWrap.querySelector<HTMLElement>(
    '.cdr-input__post-icon',
  );

  const classList = input.classList;
  const isSecondary = classList.contains('cdr-input--secondary');
  const isLarge = classList.contains('cdr-input--large');
  const hasPostIcons = classList.contains('cdr-input--posticons');
  const hasError = classList.contains('cdr-input--error') || Boolean(error);
  const isNumeric =
    input.getAttribute('inputmode') === 'numeric' ||
    (input instanceof HTMLInputElement && input.type === 'number');

  const derivedState: InputAdapterState = {
    background:
      initialState.background ?? (isSecondary ? 'secondary' : 'primary'),
    size: initialState.size ?? (isLarge ? 'large' : undefined),
    error: initialState.error ?? (hasError || undefined),
    hasPostIcons: initialState.hasPostIcons ?? hasPostIcons,
    hasPreIcon:
      initialState.hasPreIcon ??
      (classList.contains('cdr-input--preicon') || Boolean(preIcon)),
    hasPostIcon:
      initialState.hasPostIcon ??
      (classList.contains('cdr-input--posticon') || Boolean(postIcon)),
    rows:
      initialState.rows ??
      (input instanceof HTMLTextAreaElement ? input.rows : undefined),
    type:
      initialState.type ??
      (input instanceof HTMLInputElement ? input.type : undefined),
    numeric: initialState.numeric ?? isNumeric,
  };

  return createInputAdapter(
    {
      input,
      wrap: resolvedWrap,
      helperTop,
      helperBottom,
      error,
      preIcon,
      postIcon,
    },
    derivedState,
  );
};
