
import { createRouter, createWebHistory } from 'vue-router'
import AlbumInsert from '../views/AlbumInsert.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
    {
        path: '/admin/album',
        name: 'AlbumInsert',
        component: AlbumInsert
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
