import type {
  AccordionAdapterInstance,
  AccordionGroupAdapterInstance,
  AccordionGroupAdapterOptions,
  AccordionGroupAdapterState,
  AccordionGroupResolvedState,
  AccordionUnwrapValue,
} from './types';
import { createAccordionAdapterFromElement } from './dom';

/**
 * Read a breakpoint value from tokens CSS variables.
 * @param name - CSS custom property name.
 * @param fallback - Fallback numeric value.
 * @returns Parsed breakpoint in pixels.
 */
const readBreakpoint = (name: string, fallback: number): number => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/**
 * Determine the current breakpoint label.
 * @returns Breakpoint name string.
 */
const getCurrentBreakpoint = (): string => {
  const width = window?.innerWidth ?? 0;
  const sm = readBreakpoint('--cdr-breakpoint-sm', 768);
  const md = readBreakpoint('--cdr-breakpoint-md', 992);
  const lg = readBreakpoint('--cdr-breakpoint-lg', 1232);
  if (width >= sm && width < md) return 'sm';
  if (width >= md && width < lg) return 'md';
  if (width >= lg) return 'lg';
  return 'xs';
};

/**
 * Resolve the unwrapped state for a group.
 * @param value - Unwrap value.
 * @returns True if the group should be unwrapped.
 */
const resolveUnwrapped = (value: AccordionUnwrapValue): boolean => {
  if (typeof value === 'string') {
    return value.indexOf(getCurrentBreakpoint()) !== -1;
  }
  return Boolean(value);
};

/**
 * Create a vanilla adapter instance for accordion groups.
 * @param options - Group adapter options.
 * @returns Adapter instance with update/destroy APIs.
 */
export const createAccordionGroupAdapter = (
  options: AccordionGroupAdapterOptions,
): AccordionGroupAdapterInstance => {
  const {
    element,
    unwrap = false,
    accordionSelector = '.cdr-accordion',
    initialAccordionState = {},
    accordionAdapterOptions,
  } = options;
  let resolvedState: AccordionGroupResolvedState = {
    unwrap,
    isUnwrapped: resolveUnwrapped(unwrap),
  };
  let currentIdx = -1;
  let accordionButtons: HTMLElement[] = [];
  let accordionAdapters: AccordionAdapterInstance[] = [];
  let resizeHandler: (() => void) | null = null;

  /**
   * Refresh accordion button references within the group.
   * @returns Nothing.
   */
  const refreshButtons = (): void => {
    accordionButtons = Array.from(
      element.querySelectorAll<HTMLElement>('.js-cdr-accordion-button'),
    );
  };

  /**
   * Refresh accordion adapters within the group.
   * @returns Nothing.
   */
  const refreshAdapters = (): void => {
    accordionAdapters.forEach((adapter) => adapter.destroy());
    accordionAdapters = Array.from(
      element.querySelectorAll<HTMLElement>(accordionSelector),
    ).map((accordion) =>
      createAccordionAdapterFromElement({
        element: accordion,
        initialState: {
          ...initialAccordionState,
          unwrapped: resolvedState.isUnwrapped,
        },
        adapterOptions: accordionAdapterOptions,
      }),
    );
  };

  /**
   * Update roving focus index when a trigger receives focus.
   * @param event - Focus event.
   * @returns Nothing.
   */
  const handleFocusIn = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    currentIdx = accordionButtons.indexOf(target);
  };

  /**
   * Handle roving focus keyboard controls.
   * @param event - Keyboard event.
   * @returns Nothing.
   */
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (currentIdx === -1) return;
    const { key } = event;
    switch (key) {
      case 'Home':
        event.preventDefault();
        accordionButtons[0]?.focus();
        break;
      case 'End':
        event.preventDefault();
        accordionButtons[accordionButtons.length - 1]?.focus();
        break;
      case 'ArrowDown':
      case 'Down': {
        event.preventDefault();
        const nextIdx =
          currentIdx + 1 >= accordionButtons.length ? 0 : currentIdx + 1;
        accordionButtons[nextIdx]?.focus();
        break;
      }
      case 'ArrowUp':
      case 'Up': {
        event.preventDefault();
        const prevIdx =
          currentIdx - 1 <= -1 ? accordionButtons.length - 1 : currentIdx - 1;
        accordionButtons[prevIdx]?.focus();
        break;
      }
      default:
        break;
    }
  };

  /**
   * Update the unwrapped state for all child accordions.
   * @param nextUnwrapped - Whether to unwrap.
   * @returns Nothing.
   */
  const applyUnwrapped = (nextUnwrapped: boolean): void => {
    resolvedState = { ...resolvedState, isUnwrapped: nextUnwrapped };
    accordionAdapters.forEach((adapter) =>
      adapter.update({ unwrapped: resolvedState.isUnwrapped }),
    );
    refreshButtons();
    if (resolvedState.isUnwrapped) {
      currentIdx = -1;
    }
  };

  /**
   * Update the adapter state.
   * @param nextState - Partial state updates.
   * @returns Nothing.
   */
  const update = (nextState: AccordionGroupAdapterState = {}): void => {
    if (nextState.unwrap !== undefined) {
      resolvedState = { ...resolvedState, unwrap: nextState.unwrap };
    }
    applyUnwrapped(resolveUnwrapped(resolvedState.unwrap));
  };

  /**
   * Tear down event listeners and child adapters.
   * @returns Nothing.
   */
  const destroy = (): void => {
    element.removeEventListener('focusin', handleFocusIn);
    element.removeEventListener('keydown', handleKeyDown);
    accordionAdapters.forEach((adapter) => adapter.destroy());
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler);
      resizeHandler = null;
    }
  };

  refreshAdapters();
  refreshButtons();
  element.addEventListener('focusin', handleFocusIn);
  element.addEventListener('keydown', handleKeyDown);
  applyUnwrapped(resolvedState.isUnwrapped);

  if (typeof unwrap === 'string') {
    let resizeTimeout: number | null = null;
    resizeHandler = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null;
        applyUnwrapped(resolveUnwrapped(resolvedState.unwrap));
      }, 300);
    };
    window.addEventListener('resize', resizeHandler);
  }

  return {
    update,
    destroy,
    getState: () => resolvedState,
  };
};
