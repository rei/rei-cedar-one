import type { ExtractPropTypes, PropType } from 'vue';

import type {
  InputAdapterState,
  InputBackground,
  InputSize,
} from '@rei/c1-ui/adapters/input';

export const c1InputProps = {
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  numeric: {
    type: Boolean,
    default: false,
  },
  hideLabel: Boolean,
  rows: {
    type: Number,
    default: 1,
  },
  background: {
    type: String as PropType<InputBackground>,
    default: 'primary',
  },
  size: String as PropType<InputSize | undefined>,
  errorRole: {
    type: String,
    default: 'status',
  },
  error: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: false,
  },
  disabled: Boolean,
  required: Boolean,
  optional: Boolean,
  modelValue: {
    type: [String, Number] as PropType<string | number | undefined>,
  },
  postIcons: {
    type: Boolean,
    default: false,
  },
  inputContainerClass: String,
  labelClass: String,
} as const;

export type C1InputProps = ExtractPropTypes<typeof c1InputProps>;

export type { InputAdapterState };
