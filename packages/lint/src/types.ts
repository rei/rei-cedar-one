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

export type ContainerClassInfo = ModifierAnalysis;

export type ContainerTagAnalysis = {
  classes: string[];
  info: ContainerClassInfo;
};

export type LinkClassInfo = ModifierAnalysis;

export type LinkTagAnalysis = {
  tagName: string;
  attrs: Map<string, string>;
  classes: string[];
  info: LinkClassInfo;
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
