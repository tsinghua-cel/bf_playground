import { createRouter, createWebHistory } from 'vue-router'
import PlaygroundPage from '../views/PlaygroundPage.vue'
import DetailPage from '../views/DetailPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/playground',
        name: 'Playground',
        component: PlaygroundPage
    },
    {
        path: '/documents',
        name: 'Documents',
        redirect: () => {
            window.location.href = 'https://bfblog.bitheart.org'
        }
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: DetailPage,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router