import buttonRules from './rules/button-rules.js';
import captionRules from './rules/caption-rules.js';
import containerRules from './rules/container-rules.js';
import imageRules from './rules/image-rules.js';
import kickerRules from './rules/kicker-rules.js';
import listRules from './rules/list-rules.js';
import linkRules from './rules/link-rules.js';
import proseRules from './rules/prose-rules.js';
import quoteRules from './rules/quote-rules.js';
import textRules from './rules/text-rules.js';

const rules = {
  ...buttonRules.rules,
  ...captionRules.rules,
  ...containerRules.rules,
  ...imageRules.rules,
  ...kickerRules.rules,
  ...listRules.rules,
  ...linkRules.rules,
  ...proseRules.rules,
  ...quoteRules.rules,
  ...textRules.rules,
};

const configs = {
  recommended: {
    rules: {
      ...buttonRules.configs.recommended.rules,
      ...captionRules.configs.recommended.rules,
      ...containerRules.configs.recommended.rules,
      ...imageRules.configs.recommended.rules,
      ...kickerRules.configs.recommended.rules,
      ...listRules.configs.recommended.rules,
      ...linkRules.configs.recommended.rules,
      ...proseRules.configs.recommended.rules,
      ...quoteRules.configs.recommended.rules,
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
  CaptionTagAnalysis,
  ContainerClassInfo,
  ContainerTagAnalysis,
  KickerClassInfo,
  KickerTagAnalysis,
  ImageClassInfo,
  ImageTagAnalysis,
  ListClassInfo,
  ListTagAnalysis,
  LinkClassInfo,
  LinkTagAnalysis,
  ProseClassInfo,
  ProseTagAnalysis,
  QuoteClassInfo,
  QuoteTagAnalysis,
  TextComponentInfo,
  TextTagAnalysis,
} from './types.js';
