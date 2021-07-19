import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user'

export function setupMockServer() {
	createProdMockServer([...user])
}
