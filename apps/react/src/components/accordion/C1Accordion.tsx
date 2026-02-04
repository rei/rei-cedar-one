import { useEffect, useMemo, useRef, createElement } from 'react';
import { C1IconCaretDown } from '@rei/c1-icons/react';
import { useAccordionAdapter } from '@rei/c1-ui/adapters/accordion/react';

import type {
  C1AccordionProps,
  AccordionAdapterState,
} from './C1Accordion.types';
import { useAccordionUnwrap } from './accordionContext';

const cx = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(' ');

const C1Accordion = ({
  id,
  opened = false,
  compact = false,
  borderAligned = false,
  contentSpacing = true,
  level,
  label,
  onAccordionToggle,
  children,
}: C1AccordionProps) => {
  const unwrapped = useAccordionUnwrap();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const onToggleRef = useRef(onAccordionToggle);

  const state = useMemo<AccordionAdapterState>(
    () => ({
      id,
      opened,
      unwrapped,
    }),
    [id, opened, unwrapped],
  );

  useEffect(() => {
    onToggleRef.current = onAccordionToggle;
  }, [onAccordionToggle]);

  const adapterOptions = useMemo(
    () => ({
      autoToggle: false,
      onToggle: (_nextOpen: boolean, event: Event) => {
        onToggleRef.current?.(event);
      },
    }),
    [],
  );

  const adapterRefs = useMemo(
    () => ({
      root: rootRef,
      header: headerRef,
      trigger: triggerRef,
      label: labelRef,
      icon: iconRef,
      contentContainer: contentContainerRef,
      content: contentRef,
    }),
    [],
  );

  useAccordionAdapter({
    refs: adapterRefs,
    state,
    adapterOptions,
  });

  const isOpen = opened || unwrapped;
  const ariaExpanded = !unwrapped ? opened : undefined;
  const ariaControls = !unwrapped ? `${id}-collapsible` : undefined;
  const ariaHidden = !unwrapped ? !opened : undefined;
  const parsedLevel = Number(level);
  const headingLevel = Number.isFinite(parsedLevel) ? parsedLevel : 3;
  const headingTag = `h${headingLevel}` as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  const setTriggerRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
  };

  return (
    <div
      ref={rootRef}
      className={cx(
        'cdr-accordion',
        compact && 'cdr-accordion--compact',
        borderAligned && 'cdr-accordion--border-aligned',
        !contentSpacing && 'cdr-accordion--no-spacing',
        unwrapped && 'cdr-accordion--unwrap',
      )}
    >
      {createElement(
        headingTag,
        {
          ref: headerRef,
          className: unwrapped
            ? 'cdr-accordion__header--unwrapped'
            : 'cdr-accordion__header',
        },
        unwrapped ? (
          <div ref={setTriggerRef} className="js-cdr-accordion-button" id={id}>
            <span
              ref={labelRef}
              className="cdr-accordion__label"
              id={`${id}-label`}
            >
              {label}
            </span>
          </div>
        ) : (
          <button
            ref={setTriggerRef}
            type="button"
            className="cdr-accordion__button js-cdr-accordion-button"
            id={id}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
          >
            <span
              ref={labelRef}
              className="cdr-accordion__label"
              id={`${id}-label`}
            >
              {label}
            </span>
            <span
              ref={iconRef}
              className={cx(
                'cdr-accordion__icon',
                isOpen ? 'cdr-accordion--open' : 'cdr-accordion--closed',
              )}
              aria-hidden="true"
            >
              <C1IconCaretDown
                aria-hidden="true"
                focusable={false}
                inheritColor
                size={compact ? 'small' : undefined}
              />
            </span>
          </button>
        ),
      )}

      <div
        ref={contentContainerRef}
        className={cx(
          'cdr-accordion__content-container',
          isOpen ? 'cdr-accordion--open' : 'cdr-accordion--closed',
          unwrapped && 'cdr-accordion--unwrap',
        )}
      >
        <div
          ref={contentRef}
          className={cx(
            'cdr-accordion__content',
            isOpen ? 'cdr-accordion--open' : 'cdr-accordion--closed',
            unwrapped && 'cdr-accordion--unwrap',
          )}
          id={`${id}-collapsible`}
          aria-hidden={ariaHidden}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default C1Accordion;
