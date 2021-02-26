import Layout from '@/layout'

export default {
    name: 'permission',
    path: '/permission',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/permission'),
            meta: { title: '权限管理', icon: 'lock' }
        },
    ]
}