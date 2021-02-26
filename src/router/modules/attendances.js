import Layout from '@/layout'

export default {
    name: 'attendances',
    path: '/attendances',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/attendances'),
            meta: { title: '考勤管理', icon: 'skill' }
        },
    ]
}