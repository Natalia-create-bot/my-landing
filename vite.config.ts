import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/my-landing/',
  plugins: [react()],
  resolve: {
    // Библиотека подключена симлинком; без dedupe её React 18
    // попадает в бандл вместе с React 19 приложения.
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
  },
})
