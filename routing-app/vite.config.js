import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  base: '/routing/',  // Set the base path for GitHub Pages
  plugins: [react()],
  server: {
    historyApiFallback: true,  // Ensure routing fallback
  },
});
