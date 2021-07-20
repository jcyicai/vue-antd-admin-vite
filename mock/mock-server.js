import chokidar from 'chokidar'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import path from 'path'
import Mock from 'mockjs'
import { mocks } from './index'
const baseApi = import.meta.env.VITE_APP_BASE_API

const mockDir = path.join(process.cwd(), 'mock')

function registerRoutes(app) {
	let mockLastIndex
	const mocksForServer = mocks.map((route) => {
		return responseFake(route.url, route.type, route.response)
	})
	for (const mock of mocksForServer) {
		app[mock.type](mock.url, mock.response)
		mockLastIndex = app._router.stack.length
	}
	const mockRoutesLength = Object.keys(mocksForServer).length
	return {
		mockRoutesLength: mockRoutesLength,
		mockStartIndex: mockLastIndex - mockRoutesLength
	}
}

function unregisterRoutes() {
	Object.keys(require.cache).forEach((i) => {
		if (i.includes(mockDir)) {
			delete require.cache[require.resolve(i)]
		}
	})
}

const responseFake = (url, type, respond) => {
	return {
		url: new RegExp(`${baseApi}${url}`),
		type: type || 'get',
		response(req, res) {
			res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
		}
	}
}

module.exports = (app) => {
	debugger
	app.use(bodyParser.json())
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	)

	const mockRoutes = registerRoutes(app)
	var mockRoutesLength = mockRoutes.mockRoutesLength
	var mockStartIndex = mockRoutes.mockStartIndex

	chokidar
		.watch(mockDir, {
			ignored: /mock-server/,
			ignoreInitial: true
		})
		.on('all', (event, path) => {
			if (event === 'change' || event === 'add') {
				try {
					app._router.stack.splice(mockStartIndex, mockRoutesLength)

					unregisterRoutes()

					const mockRoutes = registerRoutes(app)
					mockRoutesLength = mockRoutes.mockRoutesLength
					mockStartIndex = mockRoutes.mockStartIndex

					console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
				} catch (error) {
					console.log(chalk.redBright(error))
				}
			}
		})
}
