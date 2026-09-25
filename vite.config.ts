import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Two pages: the portfolio at / and the JUMBO case study at /jumbo/.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        jumbo: fileURLToPath(new URL('./jumbo/index.html', import.meta.url)),
      },
    },
  },
})
