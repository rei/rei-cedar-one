import type { ReactNode } from 'react';

import type {
  InputAdapterState,
  InputBackground,
  InputSize,
} from '@rei/c1-ui/adapters/input';

export type C1InputSlots = {
  'helper-text-top'?: ReactNode;
  'helper-text-bottom'?: ReactNode;
  'pre-icon'?: ReactNode;
  'post-icon'?: ReactNode;
  info?: ReactNode;
  'info-action'?: ReactNode;
  error?: ReactNode;
};

export type C1InputProps = {
  id?: string;
  type?: string;
  label: string;
  numeric?: boolean;
  hideLabel?: boolean;
  rows?: number;
  background?: InputBackground;
  size?: InputSize;
  errorRole?: string;
  error?: boolean | string;
  disabled?: boolean;
  required?: boolean;
  optional?: boolean;
  postIcons?: boolean;
  inputContainerClass?: string;
  labelClass?: string;
  modelValue?: string | number;
  onUpdateModelValue?: (value: string) => void;
  slots?: C1InputSlots;
};

export type ErrorBlockProps = {
  showError: boolean;
  errorId?: string;
  errorRole: string;
  message?: ReactNode;
};

export type { InputAdapterState };
