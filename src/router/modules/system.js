import Layout from '@/layout/index.vue'

const systemRouter = {
	path: '/system',
	component: Layout,
	redirect: '/system/roleList',
	alwaysShow: true,
	name: 'System',
	meta: {
		title: '系统管理',
		icon: 'SettingOutlined',
		roles: ['admin']
	},
	children: [
		{
			path: '/system/roleList',
			component: () => import('@/views/system/roleList.vue'),
			name: 'RoleList',
			meta: {
				title: '角色管理',
				roles: ['admin']
			}
		},
		{
			path: '/system/approvalFlowConfig',
			component: () => import('@/views/system/approvalFlowConfig.vue'),
			name: 'ApprovalFlowConfig',
			meta: {
				title: '审批流配置',
				roles: ['admin']
			}
		}
	]
}

export default systemRouter
