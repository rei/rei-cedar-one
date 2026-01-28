import buttonRules from './rules/button-rules.js';
import containerRules from './rules/container-rules.js';
import linkRules from './rules/link-rules.js';

const rules = {
  ...buttonRules.rules,
  ...containerRules.rules,
  ...linkRules.rules,
};

const configs = {
  recommended: {
    rules: {
      ...buttonRules.configs.recommended.rules,
      ...containerRules.configs.recommended.rules,
      ...linkRules.configs.recommended.rules,
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
  LinkClassInfo,
  LinkTagAnalysis,
} from './types.js';
