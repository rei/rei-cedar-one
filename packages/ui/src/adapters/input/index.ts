/**
 * Framework-agnostic input adapter core.
 * Use this in vanilla HTML/CSS/JS, or wrap it with framework-specific helpers
 * (for example, a Vue composable in this same directory).
 */

export type {
  InputAdapterInstance,
  InputAdapterRefs,
  InputAdapterElementOptions,
  InputAdapterState,
  InputComputedState,
  InputBackground,
  InputSize,
  ResolvedInputState,
} from './types';

import type {
  InputAdapterInstance,
  InputAdapterRefs,
  InputAdapterElementOptions,
  InputAdapterState,
  InputComputedState,
  ResolvedInputState,
} from './types';

let inputIdCounter = 0;

/**
 * Generate a stable unique ID for inputs when none is provided.
 * @returns Generated ID string.
 */
const nextInputId = (): string => {
  return `cdr-input-${++inputIdCounter}`;
};

/**
 * Normalize adapter state by resolving defaults from DOM refs and prior state.
 * @param state - Partial adapter state updates.
 * @param refs - DOM references used for inference.
 * @param existingId - Previously resolved ID, if any.
 * @returns Fully resolved state.
 */
const normalizeState = (
  state: InputAdapterState,
  refs: InputAdapterRefs,
  existingId?: string,
): ResolvedInputState => {
  const resolvedId = state.id || existingId || refs.input.id || nextInputId();
  const background = state.background || 'primary';
  const type =
    state.type ||
    (refs.input instanceof HTMLInputElement ? refs.input.type : 'text');

  return {
    ...state,
    id: resolvedId,
    background,
    type,
    hasHelperTop: state.hasHelperTop ?? Boolean(refs.helperTop),
    hasHelperBottom: state.hasHelperBottom ?? Boolean(refs.helperBottom),
    hasPreIcon: state.hasPreIcon ?? Boolean(refs.preIcon),
    hasPostIcon: state.hasPostIcon ?? Boolean(refs.postIcon),
  };
};

/**
 * Compute derived attributes and class toggles from adapter state.
 * Consumers can use this directly in frameworks to keep templates declarative.
 * @param state - Fully resolved adapter state.
 * @returns Computed attributes and class lists.
 */
export const computeInputState = (
  state: ResolvedInputState,
): InputComputedState => {
  const hasError = Boolean(state.error);
  const isNumeric = Boolean(state.numeric || state.type === 'number');
  const hasPostIcons = Boolean(state.hasPostIcons);
  const hasPostIcon = Boolean(state.hasPostIcon);
  const hasPreIcon = Boolean(state.hasPreIcon);
  const isMultiline = Boolean(state.rows && state.rows > 1);

  const helperTopId = state.hasHelperTop
    ? `${state.id}-helper-text-top`
    : undefined;
  const helperBottomId = state.hasHelperBottom
    ? `${state.id}-helper-text-bottom`
    : undefined;
  const errorId = hasError ? `${state.id}-error` : undefined;

  const describedBy =
    [
      helperTopId,
      helperBottomId,
      state.describedBy,
      hasError ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const inputClasses = [
    'cdr-input',
    `cdr-input--${state.background}`,
    state.size ? `cdr-input--${state.size}` : undefined,
    isMultiline ? 'cdr-input--multiline' : undefined,
    hasPreIcon ? 'cdr-input--preicon' : undefined,
    hasPostIcons ? 'cdr-input--posticons' : undefined,
    !hasPostIcons && hasPostIcon ? 'cdr-input--posticon' : undefined,
    hasError ? 'cdr-input--error' : undefined,
  ].filter(Boolean) as string[];

  const wrapClasses = [
    'cdr-input-wrap',
    state.isFocused ? 'cdr-input--focus' : undefined,
  ].filter(Boolean) as string[];

  const inputAttrs: Record<string, string | undefined> = {
    id: state.id,
    type: state.type,
    'aria-required': state.required ? 'true' : undefined,
    'aria-invalid': hasError ? 'true' : undefined,
    'aria-errormessage': hasError ? errorId : undefined,
    'aria-describedby': describedBy,
    inputmode: isNumeric ? 'numeric' : undefined,
    pattern: isNumeric ? '[0-9]*' : undefined,
  };

  return {
    id: state.id,
    helperTopId,
    helperBottomId,
    errorId,
    describedBy,
    inputAttrs,
    inputClasses,
    wrapClasses,
  };
};

/**
 * Set or remove an attribute based on a value.
 * @param el - Target element.
 * @param name - Attribute name.
 * @param value - Attribute value, if any.
 */
const setAttr = (el: HTMLElement, name: string, value?: string): void => {
  if (!value) {
    el.removeAttribute(name);
    return;
  }
  el.setAttribute(name, value);
};

/**
 * Toggle a class name on an element.
 * @param el - Target element.
 * @param className - Class to toggle.
 * @param on - Whether the class should be present.
 */
const toggleClass = (el: HTMLElement, className: string, on: boolean): void => {
  if (on) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

/**
 * Apply a managed set of classes by toggling against the active list.
 * @param el - Target element.
 * @param managed - Set of classes managed by the adapter.
 * @param active - Classes that should be active.
 * @returns Nothing.
 */
const applyManagedClasses = (
  el: HTMLElement,
  managed: Set<string>,
  active: string[],
): void => {
  for (const cls of managed) {
    toggleClass(el, cls, active.includes(cls));
  }
};

/**
 * Apply computed state to DOM nodes in vanilla environments.
 * @param refs - DOM references for the input structure.
 * @param computed - Computed adapter state.
 * @param managedInputClasses - Optional managed class set for the input.
 * @param managedWrapClasses - Optional managed class set for the wrapper.
 * @returns Nothing.
 */
export const applyInputState = (
  refs: InputAdapterRefs,
  computed: InputComputedState,
  managedInputClasses?: Set<string>,
  managedWrapClasses?: Set<string>,
): void => {
  const { input, wrap, helperTop, helperBottom, error } = refs;

  if (managedInputClasses) {
    applyManagedClasses(input, managedInputClasses, computed.inputClasses);
  } else {
    for (const cls of computed.inputClasses) {
      input.classList.add(cls);
    }
  }

  for (const [name, value] of Object.entries(computed.inputAttrs)) {
    if (name === 'type' && !(input instanceof HTMLInputElement)) {
      continue;
    }
    setAttr(input, name, value);
  }

  if (wrap) {
    if (managedWrapClasses) {
      applyManagedClasses(wrap, managedWrapClasses, computed.wrapClasses);
    } else {
      wrap.classList.add('cdr-input-wrap');
      toggleClass(
        wrap,
        'cdr-input--focus',
        computed.wrapClasses.includes('cdr-input--focus'),
      );
    }
  }

  if (helperTop && computed.helperTopId) {
    if (!helperTop.id) helperTop.id = computed.helperTopId;
  }
  if (helperBottom && computed.helperBottomId) {
    if (!helperBottom.id) helperBottom.id = computed.helperBottomId;
  }
  if (error && computed.errorId) {
    if (!error.id) error.id = computed.errorId;
  }
};

/**
 * Create a vanilla adapter instance that wires focus/blur and updates DOM
 * attributes/classes as state changes.
 * @param refs - DOM references for the input structure.
 * @param initialState - Initial adapter state.
 * @returns Adapter instance with update/destroy APIs.
 */
export const createInputAdapter = (
  refs: InputAdapterRefs,
  initialState: InputAdapterState = {},
): InputAdapterInstance => {
  let resolvedState = normalizeState(initialState, refs);
  let computed = computeInputState(resolvedState);
  const managedInputClasses = new Set<string>(computed.inputClasses);
  const managedWrapClasses = new Set<string>(computed.wrapClasses);
  /**
   * Apply a new resolved state and update DOM wiring.
   * @param nextState - Fully resolved adapter state.
   * @returns Nothing.
   */
  const commitState = (nextState: ResolvedInputState): void => {
    resolvedState = nextState;
    computed = computeInputState(resolvedState);
    computed.inputClasses.forEach((cls) => managedInputClasses.add(cls));
    computed.wrapClasses.forEach((cls) => managedWrapClasses.add(cls));
    applyInputState(refs, computed, managedInputClasses, managedWrapClasses);
  };

  /**
   * Focus handler used to reflect focus state in classes.
   * @returns Nothing.
   */
  const handleFocus = (): void => {
    commitState({ ...resolvedState, isFocused: true });
  };

  /**
   * Blur handler used to reflect focus state in classes.
   * @returns Nothing.
   */
  const handleBlur = (): void => {
    commitState({ ...resolvedState, isFocused: false });
  };

  /**
   * Update adapter state and re-apply computed DOM wiring.
   * @param nextState - Partial state updates.
   * @returns Nothing.
   */
  const update = (nextState: InputAdapterState = {}): void => {
    commitState(
      normalizeState(
        { ...resolvedState, ...nextState },
        refs,
        resolvedState.id,
      ),
    );
  };

  /**
   * Tear down event listeners added by the adapter.
   * @returns Nothing.
   */
  const destroy = (): void => {
    refs.input.removeEventListener('focus', handleFocus);
    refs.input.removeEventListener('blur', handleBlur);
  };

  refs.input.addEventListener('focus', handleFocus);
  refs.input.addEventListener('blur', handleBlur);
  commitState(resolvedState);

  return {
    update,
    destroy,
    getState: () => resolvedState,
  };
};

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
