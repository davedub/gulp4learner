import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/',
            name: 'Home',
            component: Home
        }
    ]
})