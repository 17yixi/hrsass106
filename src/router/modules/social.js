import Layout from '@/layout'

export default {
    name: 'social',
    path: '/social',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/social'),
            meta: { title: '社保管理', icon: 'table' }
        },
    ]
}