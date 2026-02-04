import type { ReactNode } from 'react';

import type { AccordionAdapterState } from '@rei/c1-ui/adapters/accordion';

export type C1AccordionProps = {
  id: string;
  opened?: boolean;
  compact?: boolean;
  borderAligned?: boolean;
  contentSpacing?: boolean;
  level: number | string;
  label?: ReactNode;
  onAccordionToggle?: (event: Event) => void;
  children?: ReactNode;
};

export type { AccordionAdapterState };
