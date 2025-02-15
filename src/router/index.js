import { createRouter, createWebHistory } from 'vue-router'
import PlaygroundPage from '../views/PlaygroundPage.vue'
import DetailPage from '../views/DetailPage.vue'
import BlogsPage from '../views/Blogs.vue'
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
        path: '/blogs',
        name: 'Blogs',
        component: BlogsPage
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