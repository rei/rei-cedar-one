/**
 * Framework-agnostic accordion adapter exports.
 * Core behavior lives in `core.ts`, DOM helpers in `dom.ts`.
 */

export type {
  AccordionAdapterRefs,
  AccordionAdapterState,
  ResolvedAccordionState,
  AccordionAdapterInstance,
  AccordionAdapterElementOptions,
  AccordionAdapterOptions,
  AccordionUnwrapValue,
  AccordionGroupAdapterState,
  AccordionGroupResolvedState,
  AccordionGroupAdapterOptions,
  AccordionGroupAdapterInstance,
} from './types';

export { createAccordionAdapter } from './core';
export { createAccordionGroupAdapter } from './group';
export { createAccordionAdapterFromElement } from './dom';
