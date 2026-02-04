import type { InjectionKey, Ref } from 'vue';

export const accordionUnwrapKey: InjectionKey<Ref<boolean>> = Symbol(
  'c1-accordion-unwrap',
);
