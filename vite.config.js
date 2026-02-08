import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    lingoCompilerPlugin({
      sourceLocale: 'en',
      targetLocales: ['es', 'hi', 'ja', 'pt'],
    }),
    react()
  ],
})
