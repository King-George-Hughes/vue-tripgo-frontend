import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'
import HomeView from '@/views/HomeView.vue'
import TripsView from '@/views/TripsView.vue'
import { useUserStore } from '@/stores/user'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const isAuthenticated = () => {
  const userStore = useUserStore()
  return !!userStore.token
}

const isAdmin = () => {
  const userStore = useUserStore()
  return userStore.user.roles.includes('ROLE_ADMIN')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Default Layout
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          name: 'home',
          path: '',
          component: HomeView
        },
        {
          name: 'trips',
          path: 'trips',
          component: TripsView
        }
      ]
    },

    // Auth Layout with dynamic imports
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          name: 'my-bookings',
          path: 'my-bookings',
          component: () => import('@/views/auth/MyBookingsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          name: 'my-account',
          path: 'my-account',
          component: () => import('@/views/auth/MyAccountView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },

    // Admin Layout with dynamic imports
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'bookings',
          path: 'bookings',
          component: () => import('@/views/admin/BookingsView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'users',
          path: 'users',
          component: () => import('@/views/admin/UsersView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'buses',
          path: 'buses',
          component: () => import('@/views/admin/BusesView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'drivers',
          path: 'drivers',
          component: () => import('@/views/admin/DriversView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'locations',
          path: 'locations',
          component: () => import('@/views/admin/LocationsView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
          name: 'schedules',
          path: 'schedules',
          component: () => import('@/views/admin/SchedulesView.vue'),
          meta: { requiresAuth: true, requiresAdmin: true }
        }
      ]
    },

    {
      name: 'not-found',
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!isAuthenticated()) {
      return next({ name: 'home' })
    }
    if (to.meta.requiresAdmin && !isAdmin()) {
      return next({ name: 'home' })
    }
  }
  next()
})

router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})

export default router
