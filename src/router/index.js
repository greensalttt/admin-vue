import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AlbumInsert from '../views/AlbumInsert.vue'

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
    }
]

const router = createRouter({
    history: createWebHistory('/admin/'),
    routes
})

export default router
