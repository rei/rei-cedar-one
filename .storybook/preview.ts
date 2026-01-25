// Tokens
import '../packages/cedar-tokens/dist/web/base.css';
import '../packages/cedar-tokens/dist/web/components/button.css';

// Base
import '../packages/cedar-ui/dist/css/cedar-base.css';

// Components
import '../packages/cedar-ui/dist/css/components/button.css';
import '../packages/cedar-ui/dist/css/components/container.css';

export const parameters = {
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};
