import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AlbumInsert from '../views/AlbumInsert.vue'
import AlbumManage from '../views/AlbumManage.vue'
import PerformanceInsert from "@/views/PerformanceInsert.vue";
import PerformanceManage from "@/views/PerformanceManage.vue";
import AlbumEdit from "@/views/AlbumEdit.vue";




// 겟맵핑 페이지 이동

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },

    {
        path: '/album',
        name: 'AlbumInsert',
        component: AlbumInsert
    },

    {
        path: '/album/manage',
        name: 'AlbumManage',
        component: AlbumManage
    },

    {
        path: '/album/:ano/edit',
        name: 'AlbumEdit',
        component: AlbumEdit,
        props: true
    },

    {
        path: '/performance',
        name: 'PerformanceInsert',
        component: PerformanceInsert
    },

    {
        path: '/performance/manage',
        name: 'PerformanceManage',
        component: PerformanceManage
    }
]

const router = createRouter({
    history: createWebHistory('/admin/'),
    routes
})

export default router
