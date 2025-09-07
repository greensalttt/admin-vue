import { createRouter, createWebHistory } from 'vue-router'

import AlbumInsert from '../views/AlbumInsert.vue'

const routes = [
    {
        path: '/admin/album',
        name: 'AlbumInsert',
        component: AlbumInsert
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
