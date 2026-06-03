import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

const PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

function figmaAssetsPlugin(): Plugin {
  return {
    name: 'figma-assets',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.slice('figma:asset/'.length)
        const localPath = path.resolve(__dirname, 'src/assets', filename)
        if (fs.existsSync(localPath)) {
          return localPath
        }
        return '\0figma-asset:' + id
      }
    },
    load(id) {
      if (id.startsWith('\0figma-asset:figma:asset/')) {
        return `export default "${PLACEHOLDER}"`
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), figmaAssetsPlugin(), react()],
  // Set base to your repository name for GitHub Pages
  // For example: https://<username>.github.io/BD-Website/
  base: '/BD-Website/',
})