// Tokens
import '../../../packages/tokens/dist/css/core.css';
import '../../../packages/tokens/dist/css/components.css';

// Base
import '../../../packages/ui/dist/css/fonts.css';
import '../../../packages/ui/dist/css/reset.css';

// Components
import '../../../packages/ui/dist/css/components/button.css';
import '../../../packages/ui/dist/css/components/accordion.css';
import '../../../packages/ui/dist/css/components/accordion-group.css';
import '../../../packages/ui/dist/css/components/container.css';
import '../../../packages/ui/dist/css/components/link.css';
import '../../../packages/ui/dist/css/components/label-standalone.css';
import '../../../packages/ui/dist/css/components/label-wrapper.css';
import '../../../packages/ui/dist/css/components/input.css';
import '../../../packages/ui/dist/css/components/split-surface.css';
import '../../../packages/ui/dist/css/components/form-error.css';
import '../../../packages/ui/dist/css/components/icon.css';
import '../../../packages/ui/dist/css/components/text.css';
import '../../../packages/ui/dist/css/components/body.css';
import '../../../packages/ui/dist/css/components/eyebrow.css';
import '../../../packages/ui/dist/css/components/caption.css';
import '../../../packages/ui/dist/css/components/quote.css';
import '../../../packages/ui/dist/css/components/kicker.css';
import '../../../packages/ui/dist/css/components/abstract.css';
import '../../../packages/ui/dist/css/components/landing-lead.css';
import '../../../packages/ui/dist/css/components/title.css';
import '../../../packages/ui/dist/css/components/heading-display.css';
import '../../../packages/ui/dist/css/components/heading-sans.css';
import '../../../packages/ui/dist/css/components/heading-serif.css';
import '../../../packages/ui/dist/css/components/subheading-sans.css';
import '../../../packages/ui/dist/css/components/utility-sans.css';
import '../../../packages/ui/dist/css/components/utility-serif.css';
import '../../../packages/ui/dist/css/components/image.css';
import '../../../packages/ui/dist/css/components/prose.css';
import '../../../packages/ui/dist/css/components/list.css';

import sprite from '@rei/c1-icons/sprite.svg?raw';

const ensureSprite = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('c1-icons-sprite')) return;

  const container = document.createElement('div');
  container.id = 'c1-icons-sprite';
  container.style.display = 'none';
  container.innerHTML = sprite;
  document.body.prepend(container);
};

type StoryFn = () => string;

const withSprite = (Story: StoryFn) => {
  ensureSprite();
  return Story();
};

export const decorators = [withSprite];

export const parameters = {
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};
