import Layout from '@/layout'

export default {
    name: 'setting',
    path: '/setting',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/setting'),
            meta: { title: '公司设置', icon: 'setting' }
        },
    ]
}