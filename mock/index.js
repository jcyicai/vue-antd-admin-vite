const constantRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: 'views/login/index',
		hidden: true,
		meta: {
			title: '登录'
		}
	},
	{
		path: '/403',
		name: '403',
		component: 'views/error-page/403',
		hidden: true,
		meta: {
			title: '403'
		}
	},
	{
		path: '/404',
		name: '404',
		component: 'views/error-page/404',
		hidden: true,
		meta: {
			title: '404'
		}
	},
	{
		path: '/500',
		name: '500',
		component: 'views/error-page/500',
		hidden: true,
		meta: {
			title: '500'
		}
	},
	{
		path: '/',
		component: 'layout/Layout',
		name: 'Dashboard',
		redirect: '/dashboard',
		meta: {
			title: '控制台'
		},
		children: [
			{
				path: 'dashboard',
				component: 'views/dashboard/index',
				name: 'Dashboard',
				meta: { title: '控制台', icon: 'DashboardOutlined' }
			}
		]
	}
]

const asyncRoutes = [
	{
		path: '/userCenter',
		component: 'layout/Layout',
		redirect: 'userSet',
		alwaysShow: true,
		name: 'UserCenter',
		meta: {
			title: '个人中心',
			icon: 'UserOutlined',
			roles: ['admin', 'editor']
		},
		children: [
			{
				path: 'userSet',
				component: 'views/userCenter/userSet',
				name: 'UserSet',
				meta: {
					title: '个人设置',
					roles: ['admin', 'editor']
				}
			}
		]
	},
	{
		path: '/system',
		component: 'layout/Layout',
		redirect: 'roleList',
		alwaysShow: true,
		name: 'System',
		meta: {
			title: '系统管理',
			icon: 'SettingOutlined',
			roles: ['admin']
		},
		children: [
			{
				path: 'roleList',
				component: 'views/system/roleList',
				name: 'RoleList',
				meta: {
					title: '角色管理',
					roles: ['admin']
				}
			},
			{
				path: 'approvalFlowConfig',
				component: 'views/system/approvalFlowConfig',
				name: 'ApprovalFlowConfig',
				meta: {
					title: '审批流配置',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/permission',
		component: 'layout/Layout',
		redirect: 'rolePermissionList',
		alwaysShow: true,
		name: 'Permission',
		meta: {
			title: '权限管理',
			icon: 'KeyOutlined',
			roles: ['admin']
		},
		children: [
			{
				path: 'rolePermissionList',
				component: 'views/permission/rolePermissionList',
				name: 'RolePermissionList',
				meta: {
					title: '角色权限分配',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NoFound',
		redirect: '/404',
		hidden: true,
		meta: {
			title: 'NoFound'
		}
	}
]

const routes = [...constantRoutes, ...asyncRoutes]

const roles = [
	{
		id: 1,
		key: 'admin',
		name: 'admin',
		description: 'Super Administrator. Have access to view all pages.',
		routes: routes
	},
	{
		id: 2,
		key: 'editor',
		name: 'editor',
		description: 'Normal Editor. Can see all pages except permission page',
		routes: routes.filter((i) => i.path !== '/permission')
	},
	{
		id: 3,
		key: 'visitor',
		name: 'visitor',
		description: 'Just a visitor. Can only see the home page and the document page',
		routes: [
			{
				path: '',
				redirect: 'dashboard',
				children: [
					{
						path: 'dashboard',
						name: '首页',
						meta: { title: '首页', icon: 'dashboard' }
					}
				]
			}
		]
	}
]

const tokens = {
	admin: {
		token: 'admin-token'
	},
	editor: {
		token: 'editor-token'
	}
}

const users = {
	'admin-token': {
		roles: ['admin'],
		introduction: 'I am a super administrator',
		avatar: '',
		name: 'Jason Chen'
	},
	'editor-token': {
		roles: ['editor'],
		introduction: 'I am an editor',
		avatar: '',
		name: 'Normal Editor'
	}
}

module.exports = {
	'POST /jc-admin/user/login': (req, res) => {
		const { username } = req.body
		const token = tokens[username]

		// mock错误
		if (!token) {
			return {
				code: 604,
				message: '用户名或者密码错误'
			}
		}

		return res.json({
			code: 200,
			data: token
		})
	},
	'GET /jc-admin/user/info.*': (req, res) => {
		const { token } = req.query
		const info = users[token]

		// mock错误
		if (!info) {
			return {
				code: 508,
				message: '登录失败，无法获取用户信息'
			}
		}

		return res.json({
			code: 200,
			data: info
		})
	},
	'POST /jc-admin/user/logout': (req, res) => {
		return res.json({
			code: 200,
			data: 'success'
		})
	},
	'GET /jc-admin/routes': (req, res) => {
		return res.json({
			code: 200,
			data: routes
		})
	},
	'GET /jc-admin/roles': (req, res) => {
		return res.json({
			code: 200,
			data: roles
		})
	}
}
