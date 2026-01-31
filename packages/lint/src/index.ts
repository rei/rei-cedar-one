import abstractRules from './rules/abstract-rules.js';
import buttonRules from './rules/button-rules.js';
import captionRules from './rules/caption-rules.js';
import containerRules from './rules/container-rules.js';
import formErrorRules from './rules/form-error-rules.js';
import imageRules from './rules/image-rules.js';
import inputRules from './rules/input-rules.js';
import kickerRules from './rules/kicker-rules.js';
import landingLeadRules from './rules/landing-lead-rules.js';
import labelStandaloneRules from './rules/label-standalone-rules.js';
import labelWrapperRules from './rules/label-wrapper-rules.js';
import listRules from './rules/list-rules.js';
import linkRules from './rules/link-rules.js';
import proseRules from './rules/prose-rules.js';
import quoteRules from './rules/quote-rules.js';
import splitSurfaceRules from './rules/split-surface-rules.js';
import textRules from './rules/text-rules.js';
import titleRules from './rules/title-rules.js';

const rules = {
  ...abstractRules.rules,
  ...buttonRules.rules,
  ...captionRules.rules,
  ...containerRules.rules,
  ...formErrorRules.rules,
  ...imageRules.rules,
  ...inputRules.rules,
  ...kickerRules.rules,
  ...landingLeadRules.rules,
  ...labelStandaloneRules.rules,
  ...labelWrapperRules.rules,
  ...listRules.rules,
  ...linkRules.rules,
  ...proseRules.rules,
  ...quoteRules.rules,
  ...splitSurfaceRules.rules,
  ...textRules.rules,
  ...titleRules.rules,
};

const configs = {
  recommended: {
    rules: {
      ...abstractRules.configs.recommended.rules,
      ...buttonRules.configs.recommended.rules,
      ...captionRules.configs.recommended.rules,
      ...containerRules.configs.recommended.rules,
      ...formErrorRules.configs.recommended.rules,
      ...imageRules.configs.recommended.rules,
      ...inputRules.configs.recommended.rules,
      ...kickerRules.configs.recommended.rules,
      ...landingLeadRules.configs.recommended.rules,
      ...labelStandaloneRules.configs.recommended.rules,
      ...labelWrapperRules.configs.recommended.rules,
      ...listRules.configs.recommended.rules,
      ...linkRules.configs.recommended.rules,
      ...proseRules.configs.recommended.rules,
      ...quoteRules.configs.recommended.rules,
      ...splitSurfaceRules.configs.recommended.rules,
      ...textRules.configs.recommended.rules,
      ...titleRules.configs.recommended.rules,
    },
  },
};

export default {
  rules,
  configs,
};

export { rules, configs };
export type {
  AbstractClassInfo,
  AbstractTagAnalysis,
  ParsedTag,
  ButtonClassInfo,
  ButtonTagAnalysis,
  CaptionTagAnalysis,
  ContainerClassInfo,
  ContainerTagAnalysis,
  FormErrorTagAnalysis,
  InputTagAnalysis,
  HeadingSubheadingBlockTagAnalysis,
  KickerClassInfo,
  KickerTagAnalysis,
  LandingLeadTagAnalysis,
  ImageClassInfo,
  ImageTagAnalysis,
  ListClassInfo,
  ListTagAnalysis,
  LinkClassInfo,
  LinkTagAnalysis,
  LabelStandaloneTagAnalysis,
  LabelWrapperTagAnalysis,
  ProseClassInfo,
  ProseTagAnalysis,
  QuoteClassInfo,
  QuoteTagAnalysis,
  SplitSurfaceTagAnalysis,
  TextComponentInfo,
  TextTagAnalysis,
  TitleClassInfo,
  TitleTagAnalysis,
} from './types.js';
