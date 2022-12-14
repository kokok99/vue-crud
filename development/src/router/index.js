import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home

        },
        {
            path: '/CRUD',
            component: () => import('../views/CRUD.vue')
        }
    ]
})

export default router