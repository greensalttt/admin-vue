import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AlbumInsert from '../views/AlbumInsert.vue'
import AlbumManage from '../views/AlbumManage.vue'




// 페이지 이동

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
    }
]

const router = createRouter({
    history: createWebHistory('/admin/'),
    routes
})

export default router
