import { createRouter, createWebHistory } from 'vue-router'
import TandC from './../views/TandC.vue'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import HomeView from '@/views/HomeView.vue'
import TripsView from '@/views/TripsView.vue'
import { useUserStore } from '@/stores/user'

const isAuthenticated = () => {
  const userStore = useUserStore()
  return !!userStore.token
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'trips',
      path: '/trips',
      component: TripsView
    },
    {
      name: 'terms-and-conditions',
      path: '/terms-and-conditions',
      component: TandC
    },

    {
      name: 'dashboard',
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      name: 'not-found',
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'home' })
  } else {
    next()
  }
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})

export default router
