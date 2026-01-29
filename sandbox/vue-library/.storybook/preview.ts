import '../../../packages/tokens/dist/web/core.css';
import '../../../packages/tokens/dist/web/components.css';

import '../../../packages/ui/dist/css/fonts.css';
import '../../../packages/ui/dist/css/reset.css';
import '../../../packages/ui/dist/css/components/button.css';
import '../../../packages/ui/dist/css/components/container.css';
import '../../../packages/ui/dist/css/components/link.css';
import '../../../packages/ui/dist/css/components/text.css';
import '../../../packages/ui/dist/css/components/body.css';
import '../../../packages/ui/dist/css/components/eyebrow.css';
import '../../../packages/ui/dist/css/components/heading-display.css';
import '../../../packages/ui/dist/css/components/heading-sans.css';
import '../../../packages/ui/dist/css/components/heading-serif.css';
import '../../../packages/ui/dist/css/components/subheading-sans.css';
import '../../../packages/ui/dist/css/components/utility-sans.css';
import '../../../packages/ui/dist/css/components/utility-serif.css';
import '../../../packages/ui/dist/css/components/image.css';

export const parameters = {
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

export const tags = ['autodocs'];
