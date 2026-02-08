import React from 'react';

import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
  useOf,
} from '@storybook/addon-docs/blocks';

type Classification = 'css-only' | 'requires-adapter' | 'optional' | 'opt-in';

type MetaParameters = {
  c1Meta?: {
    classification?: Classification[];
  };
};

const CLASSIFICATION_LABELS: Record<Classification, string> = {
  'css-only': 'CSS-only',
  'requires-adapter': 'Requires adapter',
  optional: 'Optional',
  'opt-in': 'Opt-in',
};

const normalizeClassification = (value: unknown): Classification[] => {
  if (!Array.isArray(value)) return [];
  const source = value;
  return source.filter(
    (item): item is Classification =>
      item === 'css-only' ||
      item === 'requires-adapter' ||
      item === 'optional' ||
      item === 'opt-in',
  );
};

const C1ClassificationBadges = (): React.ReactElement | null => {
  const resolvedMeta = useOf('meta', ['meta']) as {
    preparedMeta?: { title?: string; parameters?: MetaParameters };
    title?: string;
    parameters?: MetaParameters;
  };

  const meta = resolvedMeta.preparedMeta ?? resolvedMeta;
  const classification = normalizeClassification(
    meta.parameters?.c1Meta?.classification,
  );

  if (classification.length === 0) return null;

  return React.createElement(
    'div',
    { className: 'c1-docs-meta' },
    React.createElement(
      'span',
      { className: 'c1-docs-meta__label sb-unstyled' },
      'Type',
    ),
    ...classification.map((entry) =>
      React.createElement(
        'span',
        {
          className: `c1-docs-badge c1-docs-badge--${entry} sb-unstyled`,
          key: entry,
        },
        CLASSIFICATION_LABELS[entry],
      ),
    ),
  );
};

export const c1DocsPage = (): React.ReactElement =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(Title),
    React.createElement(Subtitle),
    React.createElement(Description),
    React.createElement(C1ClassificationBadges),
    React.createElement(Primary),
    React.createElement(Controls),
    React.createElement(Stories),
  );
