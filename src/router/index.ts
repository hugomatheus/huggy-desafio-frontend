import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HuggyCallbackView from '@/views/HuggyCallbackView.vue'
import ContactListView from '@/views/ContactListView.vue'
import ContactChartView from '@/views/ContactChartView.vue'
import BaseTemplate from '@/layouts/BaseTemplate.vue'
import AuthTemplate from '@/layouts/AuthTemplate.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => BaseTemplate,
      children: [
        {
          path: '/contatos',
          component: ContactListView,
          name: 'contact.list',
          meta: { requiredAuth: true, title: 'Contatos' },
        },
        {
          path: '/graficos',
          component: ContactChartView,
          name: 'contact.charts',
          meta: { requiredAuth: true, title: 'Gráficos' },
        },
      ],
    },
    {
      path: '/',
      component: () => AuthTemplate,
      children: [
        {
          path: '/login',
          component: LoginView,
          name: 'login',
        },
        {
          path: '/huggy-callback',
          component: HuggyCallbackView,
          name: 'huggy.callback',
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  auth.getToken()

  if (to.meta.requiredAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
