export type InputBackground = 'primary' | 'secondary' | (string & {});
export type InputSize = 'large' | (string & {});

export interface InputAdapterState {
  id?: string;
  type?: string;
  numeric?: boolean;
  rows?: number;
  size?: InputSize;
  background?: InputBackground;
  error?: boolean | string;
  required?: boolean;
  optional?: boolean;
  hasPreIcon?: boolean;
  hasPostIcon?: boolean;
  hasPostIcons?: boolean;
  hasHelperTop?: boolean;
  hasHelperBottom?: boolean;
  describedBy?: string;
  isFocused?: boolean;
}

export interface InputAdapterRefs {
  input: HTMLInputElement | HTMLTextAreaElement;
  wrap?: HTMLElement;
  helperTop?: HTMLElement | null;
  helperBottom?: HTMLElement | null;
  error?: HTMLElement | null;
  preIcon?: HTMLElement | null;
  postIcon?: HTMLElement | null;
}

export interface ResolvedInputState extends InputAdapterState {
  id: string;
  background: InputBackground;
  type: string;
}

export interface InputComputedState {
  id: string;
  helperTopId?: string;
  helperBottomId?: string;
  errorId?: string;
  describedBy?: string;
  inputAttrs: Record<string, string | undefined>;
  inputClasses: string[];
  wrapClasses: string[];
}

export interface InputAdapterInstance {
  update(nextState?: InputAdapterState): void;
  destroy(): void;
  getState(): ResolvedInputState;
}
