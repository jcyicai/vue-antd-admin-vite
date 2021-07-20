import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
	},
	plugins: [vue()],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
})
