import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Four pages: the portfolio at /, the JUMBO case study at /jumbo/, the
      // AI Agents World website at /ai-agents-world/ and the Finance Buddy
      // project page at /finance-buddy/.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        jumbo: fileURLToPath(new URL('./jumbo/index.html', import.meta.url)),
        aaw: fileURLToPath(new URL('./ai-agents-world/index.html', import.meta.url)),
        fb: fileURLToPath(new URL('./finance-buddy/index.html', import.meta.url)),
      },
    },
  },
})
