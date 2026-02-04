export type ParsedTag = { tagName: string | null; attrs: Map<string, string> };

export type ButtonClassInfo = {
  hasIconOnly: boolean;
  hasWithBackground: boolean;
  hasIconSide: boolean;
  variantClasses: string[];
  sizeClasses: string[];
  baseSizeClasses: string[];
  iconOnlySizeClasses: string[];
  fullWidthClasses: string[];
  duplicateClasses: string[];
  invalidModifierPrefixes: string[];
  invalidSizeClasses: string[];
  invalidFullWidthClasses: string[];
  invalidIconOnlySizeClasses: string[];
  unknownModifierClasses: string[];
};

export type ButtonTagAnalysis = {
  normalizedTag: string;
  isValidTag: boolean;
  attrs: Map<string, string>;
  classes: string[];
  info: ButtonClassInfo;
};

export type ModifierAnalysis = {
  hasBase: boolean;
  modifiers: string[];
  duplicateClasses: string[];
  invalidPrefixes: string[];
  invalidModifiers: string[];
};

export type AbstractClassInfo = ModifierAnalysis;

export type AbstractTagAnalysis = {
  classes: string[];
  info: AbstractClassInfo;
};

export type LandingLeadTagAnalysis = {
  tagName: string;
  classes: string[];
  landingLeadClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasBase: boolean;
  hasElement: boolean;
};

export type HeadingSubheadingBlockTagAnalysis = {
  tagName: string;
  classes: string[];
  blockClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasBase: boolean;
  hasElement: boolean;
};

export type SplitSurfaceTagAnalysis = {
  tagName: string;
  classes: string[];
  splitSurfaceClasses: string[];
  invalidElementClasses: string[];
  duplicateClasses: string[];
  info: ModifierAnalysis;
  hasElement: boolean;
};

export type ContainerClassInfo = ModifierAnalysis;

export type ContainerTagAnalysis = {
  classes: string[];
  info: ContainerClassInfo;
};

export type KickerClassInfo = ModifierAnalysis;

export type KickerTagAnalysis = {
  classes: string[];
  info: KickerClassInfo;
};

export type IconClassInfo = ModifierAnalysis;

export type IconTagAnalysis = {
  classes: string[];
  info: IconClassInfo;
};

export type LabelStandaloneTagAnalysis = {
  tagName: string;
  classes: string[];
  labelStandaloneClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasLabelWrapper: boolean;
  hasLabel: boolean;
  hasOptional: boolean;
  hasHelper: boolean;
  hasInfo: boolean;
  hasPostContent: boolean;
  hasInfoAction: boolean;
  hasInputWrap: boolean;
  hasInputSpacing: boolean;
};

export type LabelWrapperTagAnalysis = {
  tagName: string;
  classes: string[];
  labelWrapperClasses: string[];
  invalidElementClasses: string[];
  duplicateClasses: string[];
  info: ModifierAnalysis;
  hasContainer: boolean;
  hasFigure: boolean;
  hasContent: boolean;
};

export type FormErrorTagAnalysis = {
  tagName: string;
  classes: string[];
  formErrorClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasBase: boolean;
  hasActive: boolean;
  hasIcon: boolean;
};

export type InputTagAnalysis = {
  tagName: string;
  classes: string[];
  inputClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  modifiers: string[];
  hasBase: boolean;
  hasWrap: boolean;
  hasPreIcon: boolean;
  hasPostIcon: boolean;
  hasHelperText: boolean;
};

export type AccordionTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  accordionClasses: string[];
  invalidElementClasses: string[];
  duplicateClasses: string[];
  info: ModifierAnalysis;
  hasBase: boolean;
  hasHeader: boolean;
  hasHeaderUnwrapped: boolean;
  hasButton: boolean;
  hasLabel: boolean;
  hasIcon: boolean;
  hasContentContainer: boolean;
  hasContent: boolean;
};

export type AccordionGroupTagAnalysis = {
  tagName: string;
  classes: string[];
  groupClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasBase: boolean;
};

export type TitleClassInfo = ModifierAnalysis;

export type TitleTagAnalysis = {
  classes: string[];
  info: TitleClassInfo;
};

export type CaptionTagAnalysis = {
  tagName: string;
  classes: string[];
  captionClasses: string[];
  invalidClasses: string[];
  duplicateClasses: string[];
  hasSummary: boolean;
  hasCite: boolean;
};

export type QuoteClassInfo = ModifierAnalysis;

export type QuoteTagAnalysis = {
  tagName: string;
  classes: string[];
  quoteClasses: string[];
  invalidElementClasses: string[];
  duplicateClasses: string[];
  info: QuoteClassInfo;
  hasSummary: boolean;
  hasCitation: boolean;
};

export type ProseClassInfo = ModifierAnalysis;

export type ProseTagAnalysis = {
  classes: string[];
  info: ProseClassInfo;
};

export type LinkClassInfo = ModifierAnalysis;

export type LinkTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  info: LinkClassInfo;
};

export type ListClassInfo = ModifierAnalysis;

export type ListTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  info: ListClassInfo;
};

export type ImageClassInfo = ModifierAnalysis;

export type ImageTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  info: ImageClassInfo;
};

export type TextComponentInfo = {
  baseClass: string;
  info: ModifierAnalysis;
  scaleModifiers: string[];
};

export type TextTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  textClasses: string[];
  duplicateTextClasses: string[];
  components: TextComponentInfo[];
};
