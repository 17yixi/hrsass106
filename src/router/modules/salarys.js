import Layout from '@/layout'

export default {
    name: 'salarys',
    path: '/salarys',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/salarys'),
            meta: { title: '工资管理', icon: 'money' }
        },
    ]
}