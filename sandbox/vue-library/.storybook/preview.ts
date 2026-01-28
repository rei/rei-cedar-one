import '../../../packages/tokens/dist/web/base.css';
import '../../../packages/tokens/dist/web/components/button.css';

import '../../../packages/ui/dist/css/cedar-base.css';
import '../../../packages/ui/dist/css/components/button.css';
import '../../../packages/ui/dist/css/components/container.css';
import '../../../packages/ui/dist/css/components/link.css';

export const parameters = {
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
