import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const frontendUrl = new URL(env.FRONTEND_URL || 'http://localhost:3001')
  
  return {
    plugins: [react()],
    server: {
      port: parseInt(frontendUrl.port),
      strictPort: true, // Fail if port is in use
      host: true, // Listen on all network interfaces
    },
  }
})
