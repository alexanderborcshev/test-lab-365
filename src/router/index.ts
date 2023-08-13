import {createRouter, createWebHistory} from 'vue-router'
import PeopleView from '@/views/PeopleView.vue'
import PeopleDetail from '@/views/PeopleDetail.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: PeopleView
        },
        {
            path: '/people',
            name: 'people',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: PeopleView
        },
        {
            path: '/people/:id',
            name: 'people-detail',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: PeopleDetail
        },
        {
            path: '/favorites',
            name: 'favorites',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: FavoritesView
        }
    ]
})

export default router
