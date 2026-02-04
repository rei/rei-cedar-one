import { createContext, useContext } from 'react';

const AccordionUnwrapContext = createContext(false);

export const AccordionUnwrapProvider = AccordionUnwrapContext.Provider;

export const useAccordionUnwrap = (): boolean =>
  useContext(AccordionUnwrapContext);
