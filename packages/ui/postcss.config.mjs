import postcssCustomMedia from 'postcss-custom-media';
import postcssImport from 'postcss-import';

export default {
  plugins: [postcssImport(), postcssCustomMedia({ preserve: false })],
};
