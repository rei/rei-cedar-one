import type { ExtractPropTypes, PropType } from 'vue';

import type { AccordionAdapterState } from '@rei/c1-ui/adapters/accordion';

export const c1AccordionProps = {
  id: {
    type: String,
    required: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  borderAligned: {
    type: Boolean,
    default: false,
  },
  contentSpacing: {
    type: Boolean,
    default: true,
  },
  level: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  label: String,
} as const;

export type C1AccordionProps = ExtractPropTypes<typeof c1AccordionProps>;

export type { AccordionAdapterState };
