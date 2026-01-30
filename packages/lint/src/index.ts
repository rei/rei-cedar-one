import buttonRules from './rules/button-rules.js';
import containerRules from './rules/container-rules.js';
import imageRules from './rules/image-rules.js';
import listRules from './rules/list-rules.js';
import linkRules from './rules/link-rules.js';
import proseRules from './rules/prose-rules.js';
import textRules from './rules/text-rules.js';

const rules = {
  ...buttonRules.rules,
  ...containerRules.rules,
  ...imageRules.rules,
  ...listRules.rules,
  ...linkRules.rules,
  ...proseRules.rules,
  ...textRules.rules,
};

const configs = {
  recommended: {
    rules: {
      ...buttonRules.configs.recommended.rules,
      ...containerRules.configs.recommended.rules,
      ...imageRules.configs.recommended.rules,
      ...listRules.configs.recommended.rules,
      ...linkRules.configs.recommended.rules,
      ...proseRules.configs.recommended.rules,
      ...textRules.configs.recommended.rules,
    },
  },
};

export default {
  rules,
  configs,
};

export { rules, configs };
export type {
  ParsedTag,
  ButtonClassInfo,
  ButtonTagAnalysis,
  ContainerClassInfo,
  ContainerTagAnalysis,
  ImageClassInfo,
  ImageTagAnalysis,
  ListClassInfo,
  ListTagAnalysis,
  LinkClassInfo,
  LinkTagAnalysis,
  ProseClassInfo,
  ProseTagAnalysis,
  TextComponentInfo,
  TextTagAnalysis,
} from './types.js';
