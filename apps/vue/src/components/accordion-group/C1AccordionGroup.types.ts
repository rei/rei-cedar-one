import type { ExtractPropTypes, PropType } from 'vue';

import type { AccordionGroupAdapterState } from '@rei/c1-ui/adapters/accordion';

export const c1AccordionGroupProps = {
  unwrap: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: false,
  },
} as const;

export type C1AccordionGroupProps = ExtractPropTypes<
  typeof c1AccordionGroupProps
>;

export type { AccordionGroupAdapterState };
