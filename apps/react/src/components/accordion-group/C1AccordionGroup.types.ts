import type { ReactNode } from 'react';

import type { AccordionGroupAdapterState } from '@rei/c1-ui/adapters/accordion';

export type C1AccordionGroupProps = {
  unwrap?: boolean | string;
  children?: ReactNode;
};

export type { AccordionGroupAdapterState };
