import Layout from '@/layout'

export default {
    name: 'approvals',
    path: '/approvals',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/approvals'),
            meta: { title: '审批管理', icon: 'tree-table' }
        },
    ]
}