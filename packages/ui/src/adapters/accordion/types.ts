export type AccordionAdapterRefs = {
  root: HTMLElement;
  header?: HTMLElement | null;
  trigger: HTMLElement;
  label?: HTMLElement | null;
  icon?: HTMLElement | null;
  contentContainer: HTMLElement;
  content: HTMLElement;
};

export type AccordionAdapterState = {
  id?: string;
  opened?: boolean;
  unwrapped?: boolean;
};

export type ResolvedAccordionState = {
  id: string;
  opened: boolean;
  unwrapped: boolean;
};

export type AccordionAdapterOptions = {
  autoToggle?: boolean;
  onToggle?: (nextOpen: boolean, event: Event) => void;
};

export type AccordionAdapterInstance = {
  update: (nextState?: AccordionAdapterState) => void;
  destroy: () => void;
  getState: () => ResolvedAccordionState;
};

export type AccordionAdapterElementOptions = {
  element: HTMLElement;
  initialState?: AccordionAdapterState;
  adapterOptions?: AccordionAdapterOptions;
};

export type AccordionUnwrapValue = boolean | string;

export type AccordionGroupAdapterState = {
  unwrap?: AccordionUnwrapValue;
};

export type AccordionGroupResolvedState = {
  unwrap: AccordionUnwrapValue;
  isUnwrapped: boolean;
};

export type AccordionGroupAdapterOptions = {
  element: HTMLElement;
  unwrap?: AccordionUnwrapValue;
  accordionSelector?: string;
  initialAccordionState?: AccordionAdapterState;
  accordionAdapterOptions?: AccordionAdapterOptions;
};

export type AccordionGroupAdapterInstance = {
  update: (nextState?: AccordionGroupAdapterState) => void;
  destroy: () => void;
  getState: () => AccordionGroupResolvedState;
};
