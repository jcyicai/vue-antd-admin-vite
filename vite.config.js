import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mockPlugin from 'vite-plugin-mockit'

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
		vueJsx(),
		mockPlugin({
			entry: './mock/index.js',
			watchFiles: [], // watch file or dir change refresh mock
			watchOptions: {}, //extension option from chokidar option
			disable: false // default false
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
