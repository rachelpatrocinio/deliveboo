import { createWebHistory, createRouter } from 'vue-router'

import AppHomepage from './pages/AppHomepage.vue'
import AppAdmin from './pages/AppAdmin.vue'
import AppMenu from './pages/AppMenu.vue'
import AppCarrello from './pages/AppCarrello.vue'
import AppPayment from './pages/AppPayment.vue'



const routes = [
  { path: '/', name:'home', component: AppHomepage },
  { path: '/admin', component: AppAdmin },
  { path: '/menu/:slug', name: 'menu', component: AppMenu},
  { path: '/carrello', name: 'carrello', component: AppCarrello},
  //   { path: '/:pathMatch(.*)*', name:'not-found', component: AppNotFound},
  { path: '/pagamento', name: 'pagamento', component: AppPayment},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


export default router