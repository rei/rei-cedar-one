declare module 'svgstore' {
  type SvgStore = {
    add: (name: string, svg: string) => void;
    toString: () => string;
  };

  const svgstore: (options?: { inline?: boolean }) => SvgStore;
  export default svgstore;
}
