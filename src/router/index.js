import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import { auth } from '../firebase'
Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',

		component: () => import('../views/About.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'Login',

		component: () => import('../views/Login.vue'),
		// Prevents access to login page if signed ni
		async beforeEnter (to, from, next) {
			const userData = store.getters.user.data
			if (!userData) return next()
			next({
				name: 'About'
			})
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// Routes with requiresAuth meta item will redirect to /login if unauthenticated
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	auth.onAuthStateChanged((user) => {
		if (requiresAuth && !user) {
			next('/login')
		} else {
			next()
		}
	})
})

export default router
