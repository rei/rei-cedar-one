import { addons } from 'storybook/manager-api';
import { create, themes } from 'storybook/theming';

addons.setConfig({
  theme: create({
    ...themes.dark,
    brandTitle: 'Cedar One',
    brandUrl: 'https://cedar.rei.com',
    brandImage: 'assets/c1.png',
    brandTarget: '_blank',
  }),
});
