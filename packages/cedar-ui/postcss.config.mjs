import postcssCustomMedia from 'postcss-custom-media';
import postcssCsso from 'postcss-csso';
import postcssImport from 'postcss-import';

export default {
  plugins: [
    postcssImport(),
    postcssCustomMedia({ preserve: false }),
    postcssCsso(),
  ],
};
