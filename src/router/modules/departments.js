import Layout from '@/layout'

export default {
    name: 'departments',
    path: '/departments',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/departments'),
            meta: { title: '组织架构', icon: 'tree' }
        },
    ]
}