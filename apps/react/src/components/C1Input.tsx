import type {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  ReactNode,
  RefObject,
  TextareaHTMLAttributes,
} from 'react';
import { useMemo, useRef } from 'react';

import { C1IconInformationStroke } from '@rei/c1-icons/react';
import { useInputAdapter } from '@rei/c1-ui/adapters/input/react';
import type {
  InputAdapterState,
  InputBackground,
  InputSize,
} from '@rei/c1-ui/adapters/input';

type C1InputSlots = {
  'helper-text-top'?: ReactNode;
  'helper-text-bottom'?: ReactNode;
  'pre-icon'?: ReactNode;
  'post-icon'?: ReactNode;
  info?: ReactNode;
  'info-action'?: ReactNode;
  error?: ReactNode;
};

type C1InputProps = {
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

const C1Input = ({
  id,
  type = 'text',
  label,
  numeric = false,
  hideLabel = false,
  rows = 1,
  background = 'primary',
  size,
  errorRole = 'status',
  error = false,
  disabled = false,
  required = false,
  optional = false,
  postIcons = false,
  inputContainerClass,
  labelClass,
  modelValue,
  onUpdateModelValue,
  slots,
}: C1InputProps) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const slotValues = slots ?? {};
  const helperTextTop = slotValues['helper-text-top'];
  const helperTextBottom = slotValues['helper-text-bottom'];
  const preIcon = slotValues['pre-icon'];
  const postIcon = slotValues['post-icon'];
  const info = slotValues.info;
  const infoAction = slotValues['info-action'];
  const errorSlot = slotValues.error;
  const hasHelperTop = Boolean(helperTextTop);
  const hasHelperBottom = Boolean(helperTextBottom);
  const hasPreIcon = Boolean(preIcon);
  const hasPostIcon = Boolean(postIcon);
  const hasInfo = Boolean(info);
  const hasInfoAction = Boolean(infoAction);
  const isMultiline = rows > 1;
  const showError = Boolean(error);
  const resolvedErrorMessage =
    errorSlot ?? (typeof error === 'string' ? error : undefined);

  const state = useMemo<InputAdapterState>(
    () => ({
      id,
      type,
      numeric,
      rows,
      background,
      size,
      error,
      required,
      optional,
      hasHelperTop,
      hasHelperBottom,
      hasPreIcon,
      hasPostIcon,
      hasPostIcons: postIcons,
    }),
    [
      id,
      type,
      numeric,
      rows,
      background,
      size,
      error,
      required,
      optional,
      hasHelperTop,
      hasHelperBottom,
      hasPreIcon,
      hasPostIcon,
      postIcons,
    ],
  );

  const {
    inputAttrs,
    inputClasses,
    wrapClasses,
    helperTopId,
    helperBottomId,
    errorId,
    onFocus: adapterOnFocus,
    onBlur: adapterOnBlur,
  } = useInputAdapter({
    state,
    inputRef,
  });

  const inputSpacingClass =
    !hideLabel || hasHelperTop || hasInfo
      ? 'cdr-label-standalone__input-spacing'
      : '';

  const rootClasses = ['cdr-label-standalone', inputContainerClass]
    .filter(Boolean)
    .join(' ');

  const labelClasses = [
    'cdr-label-standalone__label',
    disabled ? 'cdr-label-standalone__label--disabled' : '',
    hideLabel ? 'cdr-label-standalone__label--sr-only' : '',
    labelClass,
  ]
    .filter(Boolean)
    .join(' ');

  const handleFocus: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = () => {
    adapterOnFocus();
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = () => {
    adapterOnBlur();
  };

  const baseAttrs = {
    ...inputAttrs,
    autoComplete: 'off',
    disabled: disabled || undefined,
  } as InputHTMLAttributes<HTMLInputElement>;
  const textareaBaseAttrs = { ...baseAttrs };
  delete (textareaBaseAttrs as Partial<InputHTMLAttributes<HTMLInputElement>>)
    .type;

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    onUpdateModelValue?.(event.target.value);
  };

  const valueProps = modelValue !== undefined ? { value: modelValue } : {};

  const sharedProps = {
    className: inputClasses.join(' '),
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  return (
    <div className={rootClasses}>
      <div className="cdr-label-standalone__label-wrapper">
        <label className={labelClasses} htmlFor={inputAttrs.id}>
          {label}
          {required ? <span aria-hidden="true">*</span> : null}
          {!required && optional ? (
            <span className="cdr-label-standalone__optional">(optional)</span>
          ) : null}
        </label>
        {!hideLabel && hasHelperTop ? <br /> : null}
        {hasHelperTop ? (
          <span className="cdr-label-standalone__helper" id={helperTopId}>
            {helperTextTop}
          </span>
        ) : null}
      </div>

      <div
        className={['cdr-label-standalone__input-wrap', inputSpacingClass].join(
          ' ',
        )}
      >
        <div className={wrapClasses.join(' ')}>
          {isMultiline ? (
            <textarea
              ref={inputRef as RefObject<HTMLTextAreaElement>}
              {...(textareaBaseAttrs as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              {...sharedProps}
              rows={rows}
              {...valueProps}
            />
          ) : (
            <input
              ref={inputRef as RefObject<HTMLInputElement>}
              {...baseAttrs}
              {...sharedProps}
              type={type}
              {...valueProps}
            />
          )}
          {hasPreIcon ? (
            <span className="cdr-input__pre-icon">{preIcon}</span>
          ) : null}
          {hasPostIcon ? (
            <span className="cdr-input__post-icon">{postIcon}</span>
          ) : null}
        </div>
        {hasInfoAction ? (
          <div className="cdr-label-standalone__info-action">{infoAction}</div>
        ) : null}
      </div>

      {hasInfo ? (
        <span className="cdr-label-standalone__info">{info}</span>
      ) : null}

      <div className="cdr-label-standalone__post-content">
        {hasHelperBottom && !showError ? (
          <span className="cdr-input__helper-text" id={helperBottomId}>
            {helperTextBottom}
          </span>
        ) : null}
        <div
          className={['cdr-form-error', showError ? '--active-error' : ''].join(
            ' ',
          )}
          id={errorId}
        >
          <span
            className="cdr-form-error__icon"
            style={{ display: showError ? 'inline-flex' : 'none' }}
          >
            <C1IconInformationStroke
              aria-hidden="true"
              focusable={false}
              inheritColor
            />
          </span>
          <div role={errorRole} aria-atomic="true" aria-relevant="all">
            {showError ? <div>{resolvedErrorMessage}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default C1Input;
export type { C1InputProps };
