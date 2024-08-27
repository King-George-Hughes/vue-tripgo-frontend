import { createRouter, createWebHistory } from 'vue-router'
import TandC from './../views/TandC.vue'
import NotFound from '../views/NotFound.vue'
import HomeView from '@/views/HomeView.vue'
import TripsView from '@/views/TripsView.vue'
import { useUserStore } from '@/stores/user'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import BookingsView from '@/views/admin/BookingsView.vue'
import UsersView from '@/views/admin/UsersView.vue'
import BusesView from '@/views/admin/BusesView.vue'
import DriversView from '@/views/admin/DriversView.vue'
import LocationsView from '@/views/admin/LocationsView.vue'
import SchedulesView from '@/views/admin/SchedulesView.vue'

const isAuthenticated = () => {
  const userStore = useUserStore()
  return !!userStore.token
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
        },
        {
          name: 'terms-and-conditions',
          path: 'terms-and-conditions',
          component: TandC
        }
      ]
    },

    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: DashboardView,
          meta: { requiresAuth: true }
        },
        {
          name: 'bookings',
          path: 'bookings',
          component: BookingsView,
          meta: { requiresAuth: true }
        },
        {
          name: 'users',
          path: 'users',
          component: UsersView,
          meta: { requiresAuth: true }
        },
        {
          name: 'buses',
          path: 'buses',
          component: BusesView,
          meta: { requiresAuth: true }
        },
        {
          name: 'drivers',
          path: 'drivers',
          component: DriversView,
          meta: { requiresAuth: true }
        },
        {
          name: 'locations',
          path: 'locations',
          component: LocationsView,
          meta: { requiresAuth: true }
        },
        {
          name: 'schedules',
          path: 'schedules',
          component: SchedulesView,
          meta: { requiresAuth: true }
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

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated()) {
//       next({ name: 'home' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

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

// import { createRouter, createWebHistory } from 'vue-router'
// import TandC from './../views/TandC.vue'
// import NotFound from '../views/NotFound.vue'
// import Dashboard from '../views/admin/Dashboard.vue'
// import HomeView from '@/views/HomeView.vue'
// import TripsView from '@/views/TripsView.vue'
// import { useUserStore } from '@/stores/user'

// const isAuthenticated = () => {
//   const userStore = useUserStore()
//   return !!userStore.token
// }

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       name: 'home',
//       path: '/',
//       component: HomeView
//     },
//     {
//       name: 'trips',
//       path: '/trips',
//       component: TripsView
//     },
//     {
//       name: 'terms-and-conditions',
//       path: '/terms-and-conditions',
//       component: TandC
//     },

//     {
//       name: 'dashboard',
//       path: '/dashboard',
//       component: Dashboard,
//       meta: { requiresAuth: true }
//     },
//     {
//       name: 'not-found',
//       path: '/:catchAll(.*)',
//       component: NotFound
//     }
//   ]
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated()) {
//     next({ name: 'home' })
//   } else {
//     next()
//   }
// })

// router.afterEach((to, from, failure) => {
//   if (!failure) {
//     setTimeout(() => {
//       window.HSStaticMethods.autoInit()
//     }, 100)
//   }
// })

// export default router
