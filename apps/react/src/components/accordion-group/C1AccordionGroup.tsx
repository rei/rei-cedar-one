import { useEffect, useMemo, useRef, useState } from 'react';
import { createAccordionGroupAdapter } from '@rei/c1-ui/adapters/accordion';

import type {
  C1AccordionGroupProps,
  AccordionGroupAdapterState,
} from './C1AccordionGroup.types';
import { AccordionUnwrapProvider } from '../accordion/accordionContext';

const readBreakpoint = (name: string, fallback: number): number => {
  if (typeof window === 'undefined') return fallback;
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getCurrentBreakpoint = (): string => {
  if (typeof window === 'undefined') return 'xs';
  const width = window.innerWidth;
  const sm = readBreakpoint('--cdr-breakpoint-sm', 768);
  const md = readBreakpoint('--cdr-breakpoint-md', 992);
  const lg = readBreakpoint('--cdr-breakpoint-lg', 1232);
  if (width >= sm && width < md) return 'sm';
  if (width >= md && width < lg) return 'md';
  if (width >= lg) return 'lg';
  return 'xs';
};

const resolveUnwrapped = (value: boolean | string): boolean => {
  if (typeof value === 'string') {
    return value.indexOf(getCurrentBreakpoint()) !== -1;
  }
  return Boolean(value);
};

const C1AccordionGroup = ({
  unwrap = false,
  children,
}: C1AccordionGroupProps) => {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const adapterRef = useRef<ReturnType<
    typeof createAccordionGroupAdapter
  > | null>(null);
  const [isUnwrapped, setIsUnwrapped] = useState(() =>
    resolveUnwrapped(unwrap),
  );

  const resolvedUnwrapped = useMemo(() => resolveUnwrapped(unwrap), [unwrap]);

  useEffect(() => {
    if (!groupRef.current) return;
    adapterRef.current = createAccordionGroupAdapter({
      element: groupRef.current,
      unwrap: resolvedUnwrapped,
    });
    return () => {
      adapterRef.current?.destroy();
      adapterRef.current = null;
    };
  }, []);

  useEffect(() => {
    setIsUnwrapped(resolvedUnwrapped);
    adapterRef.current?.update({
      unwrap: resolvedUnwrapped,
    } as AccordionGroupAdapterState);
  }, [resolvedUnwrapped]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof unwrap !== 'string') return;
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null;
        const nextUnwrapped = resolveUnwrapped(unwrap);
        setIsUnwrapped(nextUnwrapped);
        adapterRef.current?.update({
          unwrap: nextUnwrapped,
        } as AccordionGroupAdapterState);
      }, 300);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [unwrap]);

  return (
    <AccordionUnwrapProvider value={isUnwrapped}>
      <div ref={groupRef} className="cdr-accordion-group">
        {children}
      </div>
    </AccordionUnwrapProvider>
  );
};

export default C1AccordionGroup;
