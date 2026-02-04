/**
 * Framework-agnostic input adapter exports.
 * Core behavior lives in `core.ts`, DOM helpers in `dom.ts`.
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

export { computeInputState, applyInputState, createInputAdapter } from './core';
export { createInputAdapterFromElement } from './dom';
