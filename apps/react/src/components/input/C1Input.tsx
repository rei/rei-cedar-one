import { useMemo, useRef } from 'react';
import { C1IconInformationStroke } from '@rei/c1-icons/react';
import { useInputAdapter } from '@rei/c1-ui/adapters/input/react';

import type {
  C1InputProps,
  ErrorBlockProps,
  InputAdapterState,
} from './C1Input.types';
import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  RefObject,
  TextareaHTMLAttributes,
} from 'react';

const cx = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');

const ErrorBlock = ({
  showError,
  errorId,
  errorRole,
  message,
}: ErrorBlockProps) => (
  <div
    className={cx('cdr-form-error', showError && '--active-error')}
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
      {showError ? <div>{message}</div> : null}
    </div>
  </div>
);

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
  const {
    'helper-text-top': helperTextTop,
    'helper-text-bottom': helperTextBottom,
    'pre-icon': preIcon,
    'post-icon': postIcon,
    info,
    'info-action': infoAction,
    error: errorSlot,
  } = slots ?? {};
  const flags = {
    hasHelperTop: Boolean(helperTextTop),
    hasHelperBottom: Boolean(helperTextBottom),
    hasPreIcon: Boolean(preIcon),
    hasPostIcon: Boolean(postIcon),
    hasInfo: Boolean(info),
    hasInfoAction: Boolean(infoAction),
  };
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
      hasHelperTop: flags.hasHelperTop,
      hasHelperBottom: flags.hasHelperBottom,
      hasPreIcon: flags.hasPreIcon,
      hasPostIcon: flags.hasPostIcon,
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
      flags,
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

  const rootClasses = cx('cdr-label-standalone', inputContainerClass);

  const labelClasses = cx(
    'cdr-label-standalone__label',
    disabled && 'cdr-label-standalone__label--disabled',
    hideLabel && 'cdr-label-standalone__label--sr-only',
    labelClass,
  );

  const baseAttrs = {
    ...inputAttrs,
    autoComplete: 'off',
    disabled: disabled || undefined,
  } as InputHTMLAttributes<HTMLInputElement>;
  const textareaBaseAttrs = {
    ...baseAttrs,
  } as TextareaHTMLAttributes<HTMLTextAreaElement>;
  delete (textareaBaseAttrs as { type?: string }).type;

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    onUpdateModelValue?.(event.target.value);
  };

  const sharedProps = {
    className: inputClasses.join(' '),
    onFocus: adapterOnFocus,
    onBlur: adapterOnBlur,
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
        {!hideLabel && flags.hasHelperTop ? <br /> : null}
        {flags.hasHelperTop ? (
          <span className="cdr-label-standalone__helper" id={helperTopId}>
            {helperTextTop}
          </span>
        ) : null}
      </div>

      <div
        className={cx(
          'cdr-label-standalone__input-wrap',
          (!hideLabel || flags.hasHelperTop || flags.hasInfo) &&
            'cdr-label-standalone__input-spacing',
        )}
      >
        <div className={wrapClasses.join(' ')}>
          {isMultiline ? (
            <textarea
              ref={inputRef as RefObject<HTMLTextAreaElement>}
              {...(textareaBaseAttrs as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              {...sharedProps}
              rows={rows}
              {...(modelValue !== undefined ? { value: modelValue } : {})}
            />
          ) : (
            <input
              ref={inputRef as RefObject<HTMLInputElement>}
              {...baseAttrs}
              {...sharedProps}
              type={type}
              {...(modelValue !== undefined ? { value: modelValue } : {})}
            />
          )}
          {flags.hasPreIcon ? (
            <span className="cdr-input__pre-icon">{preIcon}</span>
          ) : null}
          {flags.hasPostIcon ? (
            <span className="cdr-input__post-icon">{postIcon}</span>
          ) : null}
        </div>
        {flags.hasInfoAction ? (
          <div className="cdr-label-standalone__info-action">{infoAction}</div>
        ) : null}
      </div>

      {flags.hasInfo ? (
        <span className="cdr-label-standalone__info">{info}</span>
      ) : null}

      <div className="cdr-label-standalone__post-content">
        {flags.hasHelperBottom && !showError ? (
          <span className="cdr-input__helper-text" id={helperBottomId}>
            {helperTextBottom}
          </span>
        ) : null}
        <ErrorBlock
          showError={showError}
          errorId={errorId}
          errorRole={errorRole}
          message={resolvedErrorMessage}
        />
      </div>
    </div>
  );
};

export default C1Input;
export type { C1InputProps };
