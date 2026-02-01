import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist/adapters',
    emptyOutDir: false,
    lib: {
      entry: {
        'input/index': 'src/adapters/input/index.ts',
        'input/vue': 'src/adapters/input/vue.ts',
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
