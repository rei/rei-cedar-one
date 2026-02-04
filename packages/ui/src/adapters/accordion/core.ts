import type {
  AccordionAdapterRefs,
  AccordionAdapterState,
  ResolvedAccordionState,
  AccordionAdapterInstance,
  AccordionAdapterOptions,
} from './types';

let accordionIdCounter = 0;

const OPEN_CLASS = 'cdr-accordion--open';
const CLOSED_CLASS = 'cdr-accordion--closed';
const UNWRAP_CLASS = 'cdr-accordion--unwrap';

/**
 * Generate a stable unique ID for accordions when none is provided.
 * @returns Generated ID string.
 */
const nextAccordionId = (): string => {
  return `cdr-accordion-${++accordionIdCounter}`;
};

/**
 * Resolve the base accordion ID from refs or prior state.
 * @param stateId - Proposed base ID.
 * @param refs - DOM references used for inference.
 * @param existingId - Previously resolved base ID.
 * @returns Base ID string.
 */
const resolveBaseId = (
  stateId: string | undefined,
  refs: AccordionAdapterRefs,
  existingId?: string,
): string => {
  if (stateId) return stateId;
  if (existingId) return existingId;
  if (refs.trigger.id) return refs.trigger.id;
  if (refs.root.id.endsWith('-accordion')) {
    return refs.root.id.replace(/-accordion$/, '');
  }
  if (refs.content.id.endsWith('-collapsible')) {
    return refs.content.id.replace(/-collapsible$/, '');
  }
  return nextAccordionId();
};

/**
 * Normalize adapter state by resolving defaults from DOM refs and prior state.
 * @param state - Partial adapter state updates.
 * @param refs - DOM references used for inference.
 * @param existingId - Previously resolved base ID, if any.
 * @returns Fully resolved state.
 */
const normalizeState = (
  state: AccordionAdapterState,
  refs: AccordionAdapterRefs,
  existingId?: string,
): ResolvedAccordionState => {
  const resolvedId = resolveBaseId(state.id, refs, existingId);
  return {
    id: resolvedId,
    opened: state.opened ?? false,
    unwrapped: state.unwrapped ?? false,
  };
};

/**
 * Toggle a class name on an element.
 * @param el - Target element.
 * @param className - Class to toggle.
 * @param on - Whether the class should be present.
 */
const toggleClass = (
  el: HTMLElement | null | undefined,
  className: string,
  on: boolean,
): void => {
  if (!el) return;
  if (on) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
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
 * Apply ARIA wiring for the accordion trigger/content.
 * @param refs - DOM references.
 * @param state - Resolved adapter state.
 * @returns Nothing.
 */
const applyAria = (
  refs: AccordionAdapterRefs,
  state: ResolvedAccordionState,
): void => {
  if (state.unwrapped) {
    setAttr(refs.trigger, 'aria-expanded', undefined);
    setAttr(refs.trigger, 'aria-controls', undefined);
    setAttr(refs.content, 'aria-hidden', undefined);
    refs.trigger.setAttribute('tabindex', '-1');
    refs.trigger.setAttribute('aria-disabled', 'true');
    return;
  }

  refs.trigger.removeAttribute('tabindex');
  refs.trigger.removeAttribute('aria-disabled');
  setAttr(refs.trigger, 'aria-expanded', String(state.opened));
  setAttr(
    refs.trigger,
    'aria-controls',
    refs.content.id || `${state.id}-collapsible`,
  );
  setAttr(refs.content, 'aria-hidden', String(!state.opened));
};

/**
 * Apply open/closed classes for icon/content elements.
 * @param refs - DOM references.
 * @param isOpen - Whether the accordion is open.
 * @returns Nothing.
 */
const applyOpenClasses = (
  refs: AccordionAdapterRefs,
  isOpen: boolean,
): void => {
  toggleClass(refs.icon, OPEN_CLASS, isOpen);
  toggleClass(refs.icon, CLOSED_CLASS, !isOpen);
  toggleClass(refs.contentContainer, OPEN_CLASS, isOpen);
  toggleClass(refs.contentContainer, CLOSED_CLASS, !isOpen);
  toggleClass(refs.content, OPEN_CLASS, isOpen);
  toggleClass(refs.content, CLOSED_CLASS, !isOpen);
};

/**
 * Apply unwrapped state to the accordion root.
 * @param refs - DOM references.
 * @param isUnwrapped - Whether the accordion is unwrapped.
 * @returns Nothing.
 */
const applyUnwrapped = (
  refs: AccordionAdapterRefs,
  isUnwrapped: boolean,
): void => {
  toggleClass(refs.root, UNWRAP_CLASS, isUnwrapped);
  toggleClass(refs.contentContainer, UNWRAP_CLASS, isUnwrapped);
  toggleClass(refs.content, UNWRAP_CLASS, isUnwrapped);
};

/**
 * Apply IDs for the accordion elements if missing.
 * @param refs - DOM references.
 * @param state - Resolved adapter state.
 * @returns Nothing.
 */
const applyIds = (
  refs: AccordionAdapterRefs,
  state: ResolvedAccordionState,
): void => {
  if (!refs.root.id) {
    refs.root.id = `${state.id}-accordion`;
  }
  if (refs.label && !refs.label.id) {
    refs.label.id = `${state.id}-label`;
  }
  if (!refs.trigger.id) {
    refs.trigger.id = state.id;
  }
  if (!refs.content.id) {
    refs.content.id = `${state.id}-collapsible`;
  }
};

/**
 * Create a vanilla adapter instance that wires click handling and updates DOM
 * attributes/classes as state changes.
 * @param refs - DOM references for the accordion structure.
 * @param initialState - Initial adapter state.
 * @param options - Adapter behavior options.
 * @returns Adapter instance with update/destroy APIs.
 */
export const createAccordionAdapter = (
  refs: AccordionAdapterRefs,
  initialState: AccordionAdapterState = {},
  options: AccordionAdapterOptions = {},
): AccordionAdapterInstance => {
  const { autoToggle = false, onToggle } = options;
  let resolvedState = normalizeState(initialState, refs);
  let openTimer: number | null = null;
  let finishTimer: number | null = null;

  /**
   * Clear any pending animation timers.
   * @returns Nothing.
   */
  const clearTimers = (): void => {
    if (openTimer) {
      window.clearTimeout(openTimer);
      openTimer = null;
    }
    if (finishTimer) {
      window.clearTimeout(finishTimer);
      finishTimer = null;
    }
  };

  /**
   * Set the max-height on the content container.
   * @param value - Max height value.
   * @returns Nothing.
   */
  const setMaxHeight = (value: string): void => {
    refs.contentContainer.style.maxHeight = value;
  };

  /**
   * Animate the max-height transition when opening or closing.
   * @param opening - Whether the accordion is opening.
   * @returns Nothing.
   */
  const animateHeight = (opening: boolean): void => {
    clearTimers();
    const contentHeight = refs.content.scrollHeight;
    if (opening) {
      setMaxHeight('0px');
      openTimer = window.setTimeout(() => {
        setMaxHeight(`${contentHeight}px`);
        finishTimer = window.setTimeout(() => {
          setMaxHeight('none');
        }, 350);
      }, 50);
      return;
    }
    setMaxHeight(`${contentHeight}px`);
    openTimer = window.setTimeout(() => {
      setMaxHeight('0px');
      finishTimer = window.setTimeout(() => {
        setMaxHeight('0px');
      }, 350);
    }, 50);
  };

  /**
   * Apply a new resolved state and update DOM wiring.
   * @param nextState - Fully resolved adapter state.
   * @param animate - Whether to animate the height transition.
   * @returns Nothing.
   */
  const commitState = (
    nextState: ResolvedAccordionState,
    animate: boolean,
  ): void => {
    const prevOpen = resolvedState.opened || resolvedState.unwrapped;
    const nextOpen = nextState.opened || nextState.unwrapped;
    resolvedState = nextState;

    applyIds(refs, resolvedState);
    applyUnwrapped(refs, resolvedState.unwrapped);
    applyOpenClasses(refs, nextOpen);
    applyAria(refs, resolvedState);

    if (resolvedState.unwrapped) {
      clearTimers();
      setMaxHeight('none');
      return;
    }

    if (!animate) {
      setMaxHeight(nextOpen ? 'none' : '0px');
      return;
    }

    if (prevOpen !== nextOpen) {
      animateHeight(nextOpen);
    }
  };

  /**
   * Toggle the accordion open/closed.
   * @param event - Event that triggered the toggle.
   * @returns Nothing.
   */
  const handleToggle = (event: Event): void => {
    if (resolvedState.unwrapped) {
      return;
    }
    const nextOpen = !resolvedState.opened;
    if (onToggle) {
      onToggle(nextOpen, event);
    }
    if (autoToggle) {
      commitState(
        normalizeState(
          { ...resolvedState, opened: nextOpen },
          refs,
          resolvedState.id,
        ),
        true,
      );
    }
  };

  /**
   * Update adapter state and re-apply computed DOM wiring.
   * @param nextState - Partial state updates.
   * @returns Nothing.
   */
  const update = (nextState: AccordionAdapterState = {}): void => {
    commitState(
      normalizeState(
        { ...resolvedState, ...nextState },
        refs,
        resolvedState.id,
      ),
      true,
    );
  };

  /**
   * Tear down event listeners added by the adapter.
   * @returns Nothing.
   */
  const destroy = (): void => {
    refs.trigger.removeEventListener('click', handleToggle);
    clearTimers();
  };

  if (refs.trigger instanceof HTMLButtonElement) {
    if (!refs.trigger.getAttribute('type')) {
      refs.trigger.type = 'button';
    }
  }

  refs.trigger.addEventListener('click', handleToggle);
  commitState(resolvedState, false);

  return {
    update,
    destroy,
    getState: () => resolvedState,
  };
};

/**
 * Create an accordion adapter by resolving refs from an element.
 * The element can be a `.cdr-accordion` or any child inside it.
 * @param options - Element and optional initial state.
 * @returns Adapter instance with update/destroy APIs.
 */
