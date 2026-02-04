import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/adapters',
    emptyOutDir: false,
    lib: {
      entry: {
        'accordion/index': 'src/adapters/accordion/index.ts',
        'accordion/vue': 'src/adapters/accordion/vue.ts',
        'accordion/react': 'src/adapters/accordion/react.ts',
        'input/index': 'src/adapters/input/index.ts',
        'input/vue': 'src/adapters/input/vue.ts',
        'input/react': 'src/adapters/input/react.ts',
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: ['vue', 'react', 'react-dom'],
    },
    minify: 'esbuild',
    esbuild: {
      legalComments: 'none',
    },
  },
});
