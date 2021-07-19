import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
	},
	plugins: [
		vue(),
		viteMockServe({
			mockPath: './mock',
			supportTs: false
			/* injectCode: `
        import * as mockServer from './mock/mockServer.js';
        mockServer();
      ` */
		})
	],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	}
})
