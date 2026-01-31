export type InputBackground = 'primary' | 'secondary' | (string & {});
export type InputSize = 'large' | (string & {});

export interface InputAdapterState {
  id?: string;
  type?: string;
  numeric?: boolean;
  rows?: number;
  size?: InputSize;
  background?: InputBackground;
  error?: boolean | string;
  required?: boolean;
  optional?: boolean;
  hasPreIcon?: boolean;
  hasPostIcon?: boolean;
  hasPostIcons?: boolean;
  hasHelperTop?: boolean;
  hasHelperBottom?: boolean;
  describedBy?: string;
  isFocused?: boolean;
}

export interface InputAdapterRefs {
  input: HTMLInputElement | HTMLTextAreaElement;
  wrap?: HTMLElement;
  helperTop?: HTMLElement | null;
  helperBottom?: HTMLElement | null;
  error?: HTMLElement | null;
  preIcon?: HTMLElement | null;
  postIcon?: HTMLElement | null;
}

export interface ResolvedInputState extends InputAdapterState {
  id: string;
  background: InputBackground;
  type: string;
}

export interface InputComputedState {
  id: string;
  helperTopId?: string;
  helperBottomId?: string;
  errorId?: string;
  describedBy?: string;
  inputAttrs: Record<string, string | undefined>;
  inputClasses: string[];
  wrapClasses: string[];
}

export interface InputAdapterInstance {
  update(nextState?: InputAdapterState): void;
  destroy(): void;
  getState(): ResolvedInputState;
}

let inputIdCounter = 0;

const nextInputId = () => {
  inputIdCounter += 1;
  return `cdr-input-${inputIdCounter}`;
};

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

const buildDescribedBy = (ids: Array<string | undefined>) => {
  const filtered = ids.filter(Boolean) as string[];
  return filtered.length ? filtered.join(' ') : undefined;
};

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

  const describedBy = buildDescribedBy([
    helperTopId,
    helperBottomId,
    state.describedBy,
    hasError ? errorId : undefined,
  ]);

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

const setAttr = (el: HTMLElement, name: string, value?: string) => {
  if (!value) {
    el.removeAttribute(name);
    return;
  }
  el.setAttribute(name, value);
};

const toggleClass = (el: HTMLElement, className: string, on: boolean) => {
  if (on) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

const applyManagedClasses = (
  el: HTMLElement,
  managed: Set<string>,
  active: string[],
) => {
  for (const cls of managed) {
    toggleClass(el, cls, active.includes(cls));
  }
};

export const applyInputState = (
  refs: InputAdapterRefs,
  computed: InputComputedState,
  managedInputClasses?: Set<string>,
  managedWrapClasses?: Set<string>,
) => {
  const { input, wrap, helperTop, helperBottom, error } = refs;

  if (managedInputClasses) {
    applyManagedClasses(input, managedInputClasses, computed.inputClasses);
  } else {
    for (const cls of computed.inputClasses) {
      input.classList.add(cls);
    }
  }

  setAttr(input, 'id', computed.id);
  if (input instanceof HTMLInputElement) {
    setAttr(input, 'type', computed.inputAttrs.type);
  }
  setAttr(input, 'aria-required', computed.inputAttrs['aria-required']);
  setAttr(input, 'aria-invalid', computed.inputAttrs['aria-invalid']);
  setAttr(input, 'aria-errormessage', computed.inputAttrs['aria-errormessage']);
  setAttr(input, 'aria-describedby', computed.inputAttrs['aria-describedby']);
  setAttr(input, 'inputmode', computed.inputAttrs.inputmode);
  setAttr(input, 'pattern', computed.inputAttrs.pattern);

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

export const createInputAdapter = (
  refs: InputAdapterRefs,
  initialState: InputAdapterState = {},
): InputAdapterInstance => {
  let resolvedState = normalizeState(initialState, refs);
  let computed = computeInputState(resolvedState);
  const managedInputClasses = new Set<string>(computed.inputClasses);
  const managedWrapClasses = new Set<string>(computed.wrapClasses);

  const handleFocus = () => {
    resolvedState = { ...resolvedState, isFocused: true };
    computed = computeInputState(resolvedState);
    computed.inputClasses.forEach((cls) => managedInputClasses.add(cls));
    computed.wrapClasses.forEach((cls) => managedWrapClasses.add(cls));
    applyInputState(refs, computed, managedInputClasses, managedWrapClasses);
  };

  const handleBlur = () => {
    resolvedState = { ...resolvedState, isFocused: false };
    computed = computeInputState(resolvedState);
    computed.inputClasses.forEach((cls) => managedInputClasses.add(cls));
    computed.wrapClasses.forEach((cls) => managedWrapClasses.add(cls));
    applyInputState(refs, computed, managedInputClasses, managedWrapClasses);
  };

  const update = (nextState: InputAdapterState = {}) => {
    resolvedState = normalizeState(
      { ...resolvedState, ...nextState },
      refs,
      resolvedState.id,
    );
    computed = computeInputState(resolvedState);
    computed.inputClasses.forEach((cls) => managedInputClasses.add(cls));
    computed.wrapClasses.forEach((cls) => managedWrapClasses.add(cls));
    applyInputState(refs, computed, managedInputClasses, managedWrapClasses);
  };

  const destroy = () => {
    refs.input.removeEventListener('focus', handleFocus);
    refs.input.removeEventListener('blur', handleBlur);
  };

  refs.input.addEventListener('focus', handleFocus);
  refs.input.addEventListener('blur', handleBlur);
  applyInputState(refs, computed, managedInputClasses, managedWrapClasses);

  return {
    update,
    destroy,
    getState: () => resolvedState,
  };
};
